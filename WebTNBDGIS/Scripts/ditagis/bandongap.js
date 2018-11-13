require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/ImageryLayer",
    "esri/layers/support/RasterFunction",
    "esri/layers/support/MosaicRule",
    "dojo/domReady!"
], function (Map, MapView, ImageryLayer,
    RasterFunction, MosaicRule


) {

        var colorRF = new RasterFunction({
            functionName: "Stretched",
            variableName: "Raster"
        });

        var layer = new ImageryLayer({
            url: "http://ditagis.com/arcgis/rest/services/BD_ChongNgap/N/ImageServer",
            renderingRule: colorRF,
        });

        /*************************
         * Add image layer to map
         ************************/

        var map = new Map({
            basemap: "gray",
            layers: [layer]
        });

        var view = new MapView({
            container: "viewDiv",
            map: map,
            center: [106, 11],
            zoom: 9
        });

        document.getElementById('submit').onclick = function () {
            layer.definitionExpression = `Name = '${document.getElementById('definition').value}'`
            layer.refresh();
        }

    });
