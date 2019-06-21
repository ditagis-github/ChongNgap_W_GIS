define([
    "dojo/on",
    "dojo/dom-construct",
    "esri/widgets/Expand",
    "../classes/EventListener",
    "../tools/DrawingToolManager"

], function (on,
    domConstruct,
    Expand, EventListener,
    DrawingToolManager
) {
        'use strict';
        return class {
            constructor(view, options = {}) {
                this.view = view;
                this.options = {
                    position: "top-right",
                    icon: 'esri-icon-edit',
                    title: 'Biên tập dữ liệu'
                }
                for (let i in options) {
                    this.options[i] = options[i];
                }
                this.isStartup = false;
                this.eventListener = new EventListener(this);
                this.initView();
                this.drawManager = new DrawingToolManager(this.view);
                this.drawManager.on("draw-finish", e => {
                    this.eventListener.fire("draw-finish", e);
                })
                this.drawManager.on("draw-polygon-finish", e => {
                    this.eventListener.fire("draw-polygon-finish", e);
                })
            }
            get selectedFeature() {
                return this.drawManager.drawLayer;
            }
            set selectedFeature(value) {
                this.drawManager.drawLayer = value;
            }
            startup() {
                if (!this.isStartup) {
                    this.keydownEvent = this.view.on('key-down', evt => {
                        const key = evt.key;
                        if (key === 'p') {
                            this.expand.toggle();
                        }
                    })
                    this.view.ui.add(this.expand, this.options.position);
                    this.isStartup = true;
                }
            }
            destroy() {
                if (this.isStartup) {
                    if (this.keydownEvent)
                        this.keydownEvent.remove();
                    this.drawManager.clearEvents();
                    this.view.ui.remove(this.expand);
                    this.isStartup = false;
                }
            }
            initView() {
                try {
                    this.container = domConstruct.create('div', {
                        class: 'esri-widget ditagis-widget-layer-editor'
                    });
                    let ul = domConstruct.create('ul', null, this.container);

                    this.view.map.layers.map(layer => {
                        if (layer.type == 'feature' && layer.renderer) {
                            const symbol = layer.renderer.symbol || layer.renderer.uniqueValueInfos[0].symbol;
                            let layerSymbols = [];
                            //tạo tiêu đề
                            domConstruct.create('li', {
                                innerHTML: layer.title,
                                class: 'title ' + layer.visible
                            }, ul)
                            //nếu như layer không hiển thị theo domain
                            if (layer.renderer.symbol) {
                                const img = symbol.url;
                                let contentSymbol;
                                if (img) {
                                    contentSymbol = `<img src='${img}'></img>`;
                                } else {
                                    contentSymbol = `<svg overflow="hidden" width="30" height="30" style="touch-action: none;">
                                   <defs></defs><g transform="matrix(1.14666667,0.00000000,0.00000000,1.14666667,12.00000000,12.00000000)">
                                   <path 
                                   fill="rgb(${symbol.color.r}, ${symbol.color.g},${symbol.color.b})" 
                                   fill-opacity="1" 
                                   stroke-opacity="1" 
                                   path="M -10,-10 L 10,0 L 10,10 L -10,10 L -10,-10 Z" 
                                   d="M-10-10L 10 0L 10 10L-10 10L-10-10Z" 
                                   fill-rule="evenodd" 
                                   stroke-dasharray="none" 
                                   dojoGfxStrokeStyle="solid">
                                   </path></g></svg>`
                                }
                                layerSymbols.push({
                                    symbol: contentSymbol
                                })
                            }
                            for (let symbolItem of layerSymbols) {
                                const symbol = symbolItem.symbol,
                                    label = symbolItem.label,
                                    value = symbolItem.value;
                                let li = domConstruct.create('li', {
                                    class: 'list-item'
                                }, ul);
                                let div = domConstruct.create('div', {
                                    class: 'item-container'
                                }, li);
                                let symbolContainer = domConstruct.create('div', {
                                    innerHTML: symbol
                                }, div);
                                //nếu có label
                                if (label) {
                                    domConstruct.create('div', {
                                        innerHTML: label,
                                        class: 'icon-label'
                                    }, div);

                                }
                                on(li, "click", (evt) => {
                                    this.layerItemClickHandler(layer, value);
                                });

                            }
                        }
                    });

                    this.expand = new Expand({
                        expandIconClass: this.options.icon,
                        expandTooltip: this.options.title,
                        view: this.view,
                        content: this.container
                    });
                } catch (error) {
                    throw error;
                }
            }
            layerItemClickHandler(layer, value) {
                try {
                    const typeIdField = layer.renderer.field || layer.typeIdField;
                    if (value) {
                        layer.drawingAttributes = {};
                        layer.drawingAttributes[typeIdField] = value;
                    }
                    this.selectedFeature = layer;
                    switch (layer.geometryType) {
                        case 'point':
                            this.drawManager.drawPoint();
                            break;
                        case 'polygon':
                            this.drawManager.drawPolygon();
                            break;
                        default:
                            break;
                    }

                    this.expand.expanded = false;
                } catch (error) {
                }
            }
        }
    });