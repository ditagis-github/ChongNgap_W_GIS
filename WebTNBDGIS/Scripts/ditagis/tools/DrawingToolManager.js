define(["./SimpleDraw", "../editing/Editing", "../classes/EventListener"],
    function (SimpleDraw, Editing, EventListener) {
        "use strict";
        class PointDrawingToolManager {
            constructor(view) {
                this.view = view;
                this._drawLayer = null;
                this.SimpleDraw = new SimpleDraw(this.view);
                this.eventListener = new EventListener(this);
                this.editing = new Editing(this.view);
                this.registerEvent();
            }
            addFeature(graphic) {
                return this.editing.draw(this.drawLayer, graphic);
            }
            registerEvent() {
                this.SimpleDraw.on('draw-finish', (graphic) => {
                    let accept = confirm('Chắc chắn muốn thêm?');
                    if (!accept)
                        return;
                    else {
                        this.view.graphics.removeAll();
                        this.addFeature(graphic).then(_ => {
                            this.eventListener.fire('draw-finish', {
                                graphic: {
                                    layer: this.drawLayer,
                                    attributes: graphic.attributes,
                                    geometry: graphic.geometry
                                },
                                method: 'simple'
                            });
                        });
                    }
                });
                this.SimpleDraw.on("draw-polygon-finish", (graphic) => {
                    let accept = confirm('Chắc chắn muốn thêm?');
                    if (!accept)
                        return;
                    else {
                        this.view.graphics.removeAll();
                        this.addFeature(graphic).then(_ => {
                            this.eventListener.fire('draw-polygon-finish', {
                                graphic: {
                                    layer: this.drawLayer,
                                    attributes: graphic.attributes,
                                    geometry: graphic.geometry
                                },
                                method: 'simple'
                            });
                        });
                    }
                });
            }
            set drawLayer(val) {
                this._drawLayer = val;
            }
            get drawLayer() {
                return this._drawLayer;
            }
            drawPoint() {
                this.clearEvents();
                this.SimpleDraw.drawPoint(this.drawLayer);
            }
            drawPolygon() {
                this.clearEvents();
                this.SimpleDraw.drawPolygon(this.drawLayer);
            }
            clearEvents() {
                this.SimpleDraw.clearEvents();
            }
        }
        return PointDrawingToolManager;
    });
