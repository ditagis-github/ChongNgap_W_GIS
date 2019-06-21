define([
    "esri/views/draw/Draw",
    "dojo/on", 
    "esri/Graphic",
    "esri/geometry/Polygon",
    "esri/symbols/SimpleMarkerSymbol",
    "../classes/EventListener",
    "../toolview/Tooltip"],
    function ( Draw, on, Graphic,Polygon, SimpleMarkerSymbol, EventListener, Tooltip) {
        "use strict";
        class SimpleDraw {
            constructor(view) {
                this.options = {
                    tooltip: {
                        move: 'Nhấn vào màn hình để vẽ'
                    }
                };
                this.view = view;
                this.eventListener = new EventListener(this);
                this.draw = new Draw({
                    view: view
                });
            }
            drawPoint() {
                this.clickEvent = on(this.view, 'click', (evt) => {
                    this.clickHandler(evt);
                });
                this.pointerMoveEvent = on(this.view, 'pointer-move', evt => {
                    Tooltip.instance().show([evt.x, evt.y], this.options.tooltip.move);
                });
            }
            drawPolygon() {
                var action = this.draw.create("polygon");
                action.on("vertex-add", (evt) => {
                    this.createPolygonGraphic(evt.vertices);
                });
                action.on("vertex-remove", (evt) => {
                    this.createPolygonGraphic(evt.vertices);
                });
                action.on("cursor-update", (evt) => {
                    this.createPolygonGraphic(evt.vertices);
                });
                action.on("draw-complete", (evt) => {
                    var graphic = this.createPolygonGraphic(evt.vertices);
                    this.eventListener.fire('draw-polygon-finish', graphic);
                });
            }
            createPolygonGraphic(vertices) {
                this.view.graphics.removeAll();
                const polygon = new Polygon({
                    rings: vertices,
                    spatialReference: this.view.spatialReference
                });
                var graphic = new Graphic({
                    geometry: polygon,
                    symbol: {
                        type: "simple-fill", // autocasts as SimpleFillSymbol
                        color: [0, 197, 255],
                        style: "solid",
                        outline: {  // autocasts as SimpleLineSymbol
                            color: [0, 197, 255],
                            width: 1
                        }
                    }
                });
                this.view.graphics.add(graphic);
                return graphic;
            }
            clearEvents() {
                this.view.graphics.removeAll();
                if (this.clickEvent) {
                    this.clickEvent.remove();
                    this.clickEvent = null;
                }
                if (this.pointerMoveEvent) {
                    Tooltip.instance().hide();
                    this.pointerMoveEvent.remove();
                    this.pointerMoveEvent = null;
                }
            }
            clickHandler(evt) {
                evt.stopPropagation();
                let point;
                point = new Graphic({
                    geometry: this.view.toMap({
                        x: evt.x,
                        y: evt.y
                    }),
                    symbol: new SimpleMarkerSymbol()
                });
                this.eventListener.fire('draw-finish', point);
                this.clearEvents();
            }
        }
        ;
        return SimpleDraw;
    });
