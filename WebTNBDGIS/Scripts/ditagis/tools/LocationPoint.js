define([
    "esri/Graphic",
], function (Graphic) {
    class LocationPoint {
        constructor(view) {
            this.view = view;
            this.initWidget();
        }
        initWidget() {
            this.searchdiv = $('<div/>', {
                class: 'toado-group-widget input-group add-on',
            });
            $('<input/>', {
                class: 'form-control item-toado',
                type: 'text',
                id: 'toado-x',
                placeholder: "Tọa độ x"
            }).appendTo(this.searchdiv);
            $('<input/>', {
                class: 'form-control item-toado',
                type: 'text',
                id: 'toado-y',
                placeholder: "Tọa độ y"
            }).appendTo(this.searchdiv);
            $('<input/>', {
                class: 'form-control item-toado',
                type: 'text',
                id: 'zoom-map',
                placeholder: "Thu phóng"
            }).appendTo(this.searchdiv);
            var input_group = $('<div/>', {
                class: 'input-group-btn',
            }).appendTo(this.searchdiv);
            var btnMarker = $('<button/>', {
                class: 'btn btn-marker',
                type: 'submit',
            }).appendTo(input_group);
            $('<i/>', {
                class: 'glyphicon glyphicon-map-marker',
            }).appendTo(btnMarker);
            btnMarker.on('click', (evt) => {
                var toadox = document.getElementById('toado-x');
                var toadoy = document.getElementById('toado-y');
                var zoom = document.getElementById('zoom-map');
                if (toadox.value && toadoy.value) {
                    if (!isNaN(toadox.value) && !isNaN(toadoy.value)) {
                        this.view.graphics.removeAll();
                        this.view.center = {
                            longitude: parseFloat(toadox.value),
                            latitude: parseFloat(toadoy.value)
                        }
                        if (zoom.value) {
                            if (!isNaN(zoom.value)) {
                                this.view.zoom = parseInt(zoom.value);
                            }
                        }
                        var graphic = new Graphic({
                            geometry: this.view.center,
                            symbol: {
                                type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                                color: [226, 119, 40]
                            }
                        });
                        this.view.graphics.add(graphic);
                    }
                }
            })

        }
        start() {
            this.view.ui.add(this.searchdiv[0], 'bottom-left');
        }
        cancel() {
            this.view.ui.remove(this.searchdiv[0], 'bottom-left');
        }

    }
    ;
    return LocationPoint;
});
