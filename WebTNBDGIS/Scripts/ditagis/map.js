require([

    "ditagis/configs",
    "ditagis/maptools/SearchLayer",
    "ditagis/layers/FeatureLayer",
    "esri/toolbars/navigation", "dijit/registry", "dojo/on",
    "esri/map", "esri/graphic",
    "esri/request", "esri/config", "esri/Color",
    "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/ImageParameters",
    "esri/geometry/Point", "esri/geometry/Extent",
    "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleMarkerSymbol",
    "esri/arcgis/utils",
    "esri/tasks/query", "esri/tasks/GeometryService", "esri/tasks/PrintTemplate",
    "esri/tasks/ProjectParameters",
    "esri/dijit/HomeButton", "esri/dijit/Scalebar", "esri/dijit/LayerList", "esri/dijit/Legend",
    "esri/dijit/Measurement", "esri/dijit/Print",
    "dojo/_base/array", "dojo/dom", "dojo/parser",
    "dijit/Toolbar",
    "dojo/domReady!"
], function (configs, SearchLayer,
    FeatureLayer,
    Navigation, registry, on,
    Map, Graphic,
    esriRequest, esriConfig, Color,

    ArcGISDynamicMapServiceLayer, ImageParameters,
    Point, Extent,
    SimpleLineSymbol, SimpleFillSymbol, SimpleMarkerSymbol,
    arcgisUtils,
    Query, GeometryService, PrintTemplate,
    ProjectParameters, HomeButton, Scalebar, LayerList, Legend,
    Measurement, Print,
    array, dom, parser,


    ) {


        parser.parse();
        esriConfig.defaults.geometryService = new GeometryService("http://112.78.4.175:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer");
        esriConfig.defaults.io.corsEnabledServers.push({
            host: "sampleserver6.arcgisonline.com",
            withCredentials: true
        })
        var imageParameters = new ImageParameters();
        imageParameters.format = "jpeg";

        var geoMetryLink = "http://112.78.4.175:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer";
        var printUrl = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task";



        var baseMapServiceLayer = new ArcGISDynamicMapServiceLayer(configs.basemap.url, {
            "imageParameters": imageParameters,
            id: configs.basemap.title,
            className: "BaseMapLayer",
            title: configs.basemap.title
        });


        // Get a reference to the ArcGIS Map class
        var map = new Map("mapDiv", {
            logo: false,
        });
        // // map.on("layers-add-result", initEditor);
        map.on('load', loadedMap);
        function loadedMap() {
            var centerStart = new esri.geometry.Point(602626.795, 1228203.586, map.spatialReference);
            map.centerAt(centerStart);
            map.setScale(500000);
        }
        var printer = new Print({
            map: map,
            url: printUrl
        }, dom.byId("print_button"));
        print.templates = [{
            label: "Map",
            format: "PDF",
            layout: "MAP_ONLY",
            exportOptions: {
                width: 500,
                height: 400,
                dpi: 96
            }
        }, {
            label: "Layout",
            format: "PDF",
            layout: "A4 Portrait",
            layoutOptions: {
                titleText: "My Print",
                authorText: "esri",
                copyrightText: "My Company",
                scalebarUnit: "Miles",
            }
        }]
        printer.startup();

        var style_point = new SimpleMarkerSymbol({
            "color": [127, 255, 255, 255], "size": 10, "type": "esriSMS", "style": "esriSMSCircle", "outline": {
                "color": [0, 0, 0, 255], "width": 1, "type": "esriSLS", "style": "esriSLSSolid"
            }
        });

        var selectionSymbol = new SimpleFillSymbol(
            SimpleFillSymbol.STYLE_NULL, new SimpleLineSymbol("solid", new Color([127, 255, 255, 255]), 10), null
        );

        var style_polygon = new SimpleFillSymbol().setColor(new Color([174, 12, 229, 0.5]));


        map.addLayer(baseMapServiceLayer);
        var featureLayers = [];
        for (const key in configs.layers) {
            let layercf = configs.layers[key];
            let featureLayer = new FeatureLayer(layercf.url);
            featureLayer.outFields = ["*"];
            featureLayer.id = layercf.id;
            featureLayer.searchFields = layercf.searchFields;
            featureLayer.title = layercf.title;
            featureLayers.push(featureLayer);
            featureLayer.on('load', (result) => {
                const layer = result.layer;
                if (layer.id == "CongThoatNuoc") {
                    layer.setSelectionSymbol(selectionSymbol);
                }
                else {
                    layer.setSelectionSymbol(layer.geometryType === "esriGeometryPoint" ? style_point :
                        layer.geometryType === "esriGeometryPolygon" ? style_polygon : null);
                }
            });
        }
        map.addLayers(featureLayers);
        map.on("layers-add-result", function (evt) {
            var layerInfos = array.map(evt.layers, function (layer, index) {
                return { layer: layer.layer, title: layer.layer.name };
            });
            if (layerInfos.length > 0) {
                var legendDijit = new Legend({
                    map: map,
                    layerInfos: layerInfos
                }, "legendDiv");
                legendDijit.startup();
                var ul = $("#search-layers");
                for (const layerInfo of layerInfos) {
                    let li = $('<li/>').appendTo(ul);
                    $('<a/>', {
                        id: layerInfo.layer.id,
                        class: "searchData",
                        text: layerInfo.layer.title

                    }).appendTo(li);
                }
            }
            new SearchLayer(map);
        });
        
        var homeButton = new HomeButton({
            theme: "HomeButton",
            map: map,
            extent: null,
            visible: false
        }, "homeButton");
        homeButton.startup();

        $("#home").click(function () {
            homeButton.home();
        });


        var scalebar = new Scalebar({
            map: map,
            scalebarUnit: "dual"
        });

        //var layersView = [BaseMap];
        var myWidget = new LayerList({
            map: map,
            layers: arcgisUtils.getLayerList(map)
        }, "LayerList_Content");
        myWidget.startup();
        ////////////////////////////////

        var navToolbar;
        navToolbar = new Navigation(map);
        on(navToolbar, "onExtentHistoryChange", extentHistoryChangeHandler);

        registry.byId("zoomin").on("click", function () {
            navToolbar.activate(Navigation.ZOOM_IN);
        });

        registry.byId("zoomout").on("click", function () {
            navToolbar.activate(Navigation.ZOOM_OUT);
        });

        registry.byId("zoomfullext").on("click", function () {
            navToolbar.zoomToFullExtent();
        });

        registry.byId("zoomprev").on("click", function () {
            navToolbar.zoomToPrevExtent();
        });

        registry.byId("zoomnext").on("click", function () {
            navToolbar.zoomToNextExtent();
        });

        registry.byId("pan").on("click", function () {
            navToolbar.activate(Navigation.PAN);
        });

        registry.byId("deactivate").on("click", function () {
            navToolbar.deactivate();
            $(".left_panel").hide();
            $(".panel-group").hide();

        });

        function extentHistoryChangeHandler() {
            registry.byId("zoomprev").disabled = navToolbar.isFirstExtent();
            registry.byId("zoomnext").disabled = navToolbar.isLastExtent();
        }

        var measurement = new Measurement({
            map: map
        }, dom.byId("DistancePanel_Content"));
        measurement.startup();

        //// for location //////////////

        ////////////////////Print data//////////////////////////////
        // get print templates from the export web map task

        // end print

        $("#locationButton").click(function (evt) {
            initFunc(map);
        });

        function initFunc(map) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(zoomToLocation, locationError,
                    {
                        //timeout: 0,
                        enableHighAccuracy: true,
                        maximumAge: Infinity
                    }
                );
            } else {
                alert("Browser doesn't support Geolocation. Visit http://caniuse.com to see browser support for the Geolocation API.");
            }
        }

        function zoomToLocation(location) {
            // get lat/lon and convert to VN_2000
            var geometryService = new GeometryService(geoMetryLink);
            var inputpoint = new Point(location.coords.longitude, location.coords.latitude);
            console.log(inputpoint);

            var PrjParams = new ProjectParameters();
            PrjParams.geometries = [inputpoint];
            PrjParams.outSR = map.spatialReference;

            geometryService.project(PrjParams, function (outputpoint) {
                y = outputpoint[0].y + 112.01;
                x = outputpoint[0].x - 196.5;
                var pt = new Point(x, y, map.spatialReference);

                var ptSymbol = new SimpleMarkerSymbol({
                    "color": [127, 255, 255, 255],
                    "size": 10,
                    "type": "esriSMS",
                    "style": "esriSMSCircle",
                    "outline": {
                        "color": [0, 0, 0, 255],
                        "width": 1,
                        "type": "esriSLS",
                        "style": "esriSLSSolid"
                    }
                });
                var ptGraphic = new Graphic(pt, ptSymbol);
                map.graphics.clear();
                map.graphics.add(ptGraphic);
                map.centerAndZoom(pt, 0.01);
            });

        }

        function locationError(error) {
            //error occurred so stop watchPosition
            if (navigator.geolocation) {
                navigator.geolocation.clearWatch();
            }
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("Location not provided");
                    break;

                case error.POSITION_UNAVAILABLE:
                    alert("Current location not available");
                    break;

                case error.TIMEOUT:
                    alert("Timeout");
                    break;

                default:
                    alert("unknown error");
                    break;
            }
        }
        //end location





        $("#distanceButton").click(function (evt) {
            $("#SearchPanel").slideUp();
            $("#LayerList").slideUp();
            $("#PrintPanel").slideUp();
            $("#LayerLegend").slideUp();
            $("#DistancePanel").slideDown();
        });

        $("#listLayerButton").click(function (evt) {
            $(".panel-group").hide();
            $("#LayerList").show();
        });


        $("#legendLayerButton").click(function (evt) {
            $(".panel-group").hide();
            $("#LayerLegend").show();
        });

        $("#printButton").click(function (evt) {
            $(".panel-group").hide();
            $("#PrintPanel").show();
        });

        $("#searchButton").click(function (evt) {
            $("#LayerList").slideUp();
            $("#PrintPanel").slideUp();
            $("#DistancePanel").slideUp();
            $("#LayerLegend").slideUp();
            $("#SearchPanel").slideDown();
            $(".SearchPanel_Content").removeClass("display");
            $(".SearchPanel_Content").addClass("undisplay");
            $("#SearchPanel_LuuVucThoatNuoc_Content").removeClass("undisplay");
            $("#SearchPanel_LuuVucThoatNuoc_Content").addClass("display");

            var height = $(document).height();
            var hesub = $("#SearchPanel_LuuVucThoatNuoc_Content").height();
            height = height - hesub - 105;
            if (height < 200) {
                height = 200;
            }
            $("#result_SearchData").css("height", height + "px");

        });





    });