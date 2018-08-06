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

        // var url = "/DotNet/proxy.ashx";
        // esriConfig.defaults.io.proxyUrl = url;
        //This service is for development and testing purposes only. We recommend that you create your own geometry service for use within your applications
        esriConfig.defaults.geometryService = new GeometryService("http://112.78.4.175:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer");

        var urlLocation = "";

        var imageParameters = new ImageParameters();
        imageParameters.format = "jpeg";

        var geoMetryLink = "http://112.78.4.175:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer";
        var printUrl = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task";

        var linkBaseMap = "http://112.78.4.175:6080/arcgis/rest/services/BaseMap_ChongNgapBD/MapServer";
        var linkHanhChinhHuyen = "http://112.78.4.175:6080/arcgis/rest/services/BaseMap_ChongNgapBD/MapServer/5";
        var linkHanhChinhXa = "http://112.78.4.175:6080/arcgis/rest/services/BaseMap_ChongNgapBD/MapServer/4";
        var linkChuyenDeGISMap = "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer";



        varLinkTramBom = "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/0";
        varLinkMoiNoiCongTN = "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/1";
        varLinkMiengXa = "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/2";
        varLinkHoGa = "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/3";
        varLinkGieng = "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/4";
        varLinkBeChua = "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/5";
        varLinkCongThoatNuoc = "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/6";
        varLinkKhuVucNgap = "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/7";
        varLinkTramXLNT = "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/8";
        varLinkLuuVucThoatNuoc = "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/9";

        var baseMapServiceLayer = new ArcGISDynamicMapServiceLayer(linkBaseMap, {
            "imageParameters": imageParameters,
            "id": "Bản đồ nền",
            "className": "BaseMapLayer"
        });

        var ChuyenDeGISMapServiceLayer = new ArcGISDynamicMapServiceLayer(linkChuyenDeGISMap, {
            "imageParameters": imageParameters,
            "id": "Bản đồ chuyên đề"
        });

        var HanhChinhHuyenFeatureLayer = new FeatureLayer(linkHanhChinhHuyen,
            {
                mode: FeatureLayer.MODE_ONEDEMAND,
                outFields: ["*"],
                id: "HanhChinhHuyen"
            });

        var HanhChinhXaFeatureLayer = new FeatureLayer(linkHanhChinhXa,
            {
                mode: FeatureLayer.MODE_ONEDEMAND,
                outFields: ["*"]
            });


        var LuuVucThoatNuocFeatureLayer = new FeatureLayer(varLinkLuuVucThoatNuoc,
            {
                mode: FeatureLayer.MODE_ONEDEMAND,
                outFields: ["*"]
            });


        // Get a reference to the ArcGIS Map class
        var map = new Map("mapDiv", {
            logo: false,
        });
        // map.on("layers-add-result", initEditor);
        map.on('load', loadedMap);
        function loadedMap() {
            var centerStart = new esri.geometry.Point(602626.795, 1228203.586, map.spatialReference);
            map.centerAt(centerStart);
            map.setScale(500000);
        }


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
            // map.addLayer(featureLayer);
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
        // on(map, "layer-add-result", initEditor);
        map.on("layers-add-result", function (evt) {
            var layerInfo = array.map(evt.layers, function (layer, index) {
                return { layer: layer.layer, title: layer.layer.name };
            });
            if (layerInfo.length > 0) {
                var legendDijit = new Legend({
                    map: map,
                    layerInfos: layerInfo
                }, "legendDiv");
                legendDijit.startup();
            }
        });
        function initEditor(evt) {

            getHanhChinhHuyen();

            // var map = this;

            var layerInfo = array.map(evt.layers, function (layer, index) {
                return { layer: layer.layer, title: layer.layer.name };
            });
            if (layerInfo.length > 0) {
                var legendDijit = new Legend({
                    map: map,
                    layerInfos: layerInfo
                }, "LayerLegend_Content");
                legendDijit.startup();
            }

            var layers = array.map(evt.layers, function (result) {
                return result.layer;
            });


            //display read-only info window when user clicks on feature 
            var query = new esri.tasks.Query();

            dojo.forEach(layers, function (layer) {
                dojo.connect(layer, "onClick", function (evt) {
                    if (map.infoWindow.isShowing) {
                        map.infoWindow.hide();
                    }

                    var layerInfos = [{
                        'featureLayer': layer,
                        'isEditable': false,
                        'showDeleteButton': false
                    }];

                    var attInspector = new esri.dijit.AttributeInspector({
                        layerInfos: layerInfos
                    }, dojo.create("div"));

                    if (evt.graphic) {
                        query.objectIds = [evt.graphic.attributes["OBJECTID"]];
                    }
                    else {
                        return;
                    }
                    layer.selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW, function (features) {
                        if (features.length > 0) {
                            featUpdate = features[0];
                            map.infoWindow.setTitle(layer.name);
                            map.infoWindow.setContent(attInspector.domNode);
                            map.infoWindow.resize(310, 350);

                            var typeGeo = layer.geometryType;
                            // alert(typeGeo);
                            if (typeGeo == 'esriGeometryPoint') {
                                map.infoWindow.show(featUpdate.geometry, map.getInfoWindowAnchor(featUpdate.geometry));
                            }
                            else {
                                var myPolygonCenterLatLon = featUpdate.geometry.getExtent().getCenter();
                                map.infoWindow.show(myPolygonCenterLatLon, map.getInfoWindowAnchor(myPolygonCenterLatLon));
                            }

                        }
                        else {
                            map.infoWindow.hide();
                        }
                    });

                });
            });

            map.on("click", function (evt) {
                map.graphics.clear();
            });
            map.infoWindow.on("hide", function () {
                /*tam cmt*/
                // LuuVucThoatNuocFeatureLayer.clearSelection();
                // KhuVucNgapFeatureLayer.clearSelection();
                // TramBomFeatureLayer.clearSelection();
                // TramXLNTFeatureLayer.clearSelection();
                // BeChuaFeatureLayer.clearSelection();
                // CongThoatNuocFeatureLayer.clearSelection();
                // MoiNoiCongTNFeatureLayer.clearSelection();
                // MiengXaFeatureLayer.clearSelection();
                // HoGaFeatureLayer.clearSelection();
                // GiengFeatureLayer.clearSelection();
            });

        }

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
        var printInfo = esriRequest({
            "url": printUrl,
            "content": { "f": "json" }
        });
        printInfo.then(handlePrintInfo, handleError);

        function handlePrintInfo(resp) {

            var layoutTemplate, templateNames, mapOnlyIndex, templates;

            layoutTemplate = array.filter(resp.parameters, function (param, idx) {
                return param.name === "Layout_Template";
            });

            if (layoutTemplate.length === 0) {
                return;
            }
            templateNames = layoutTemplate[0].choiceList;

            // remove the MAP_ONLY template then add it to the end of the list of templates 
            mapOnlyIndex = array.indexOf(templateNames, "MAP_ONLY");
            if (mapOnlyIndex > -1) {
                var mapOnly = templateNames.splice(mapOnlyIndex, mapOnlyIndex + 1)[0];
                templateNames.push(mapOnly);
            }

            // create a print template for each choice
            templates = array.map(templateNames, function (ch) {
                var plate = new PrintTemplate();
                plate.layout = plate.label = ch;
                plate.format = "PDF";
                plate.layoutOptions = {
                    "authorText": "Làm bởi: DITAGIS",
                    "copyrightText": "",
                    "legendLayers": [],
                    "titleText": "Bản đồ chuyên đề chống ngập tỉnh Bình Dương",
                    "scalebarUnit": "Miles"
                };
                return plate;
            });

            // create the print dijit
            var printer = new Print({
                "map": map,
                "templates": templates,
                url: printUrl
            }, dom.byId("printButton"));
            printer.startup();
        }
        var printer = new Print({
            map: map,
            url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
          }, dom.byId("print_button"));
          printer.startup();
        function handleError(err) {
            // console.log("Something broke: ", err);
        }

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



        function getHanhChinhHuyen() {
            var query = new Query();
            query.where = "1=1";
            var htmlHuyen = "<option value=''>Chọn quận / huyện </option>";
            HanhChinhHuyenFeatureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {

                if (results.length > 0) {
                    for (var i = 0; i < results.length; i++) {
                        var feat = results[i];
                        var attr = feat.attributes;
                        htmlHuyen += "<option value='" + attr["MaHuyenTP"] + "'>" + attr["TenHuyen"] + "</option>";

                    }
                    $("#cbb_QuanHuyen_LuuVucThoatNuoc").html(htmlHuyen);
                    $("#cbb_QuanHuyen_KhuVucNgap").html(htmlHuyen);
                    $("#cbb_QuanHuyen_TramBom").html(htmlHuyen);
                    $("#cbb_QuanHuyen_TramXLNT").html(htmlHuyen);
                    $("#cbb_QuanHuyen_BeChua").html(htmlHuyen);
                    $("#cbb_QuanHuyen_CongThoatNuoc").html(htmlHuyen);
                    $("#cbb_QuanHuyen_MoiNoiCong").html(htmlHuyen);
                    $("#cbb_QuanHuyen_MiengXa").html(htmlHuyen);
                    $("#cbb_QuanHuyen_HoGa").html(htmlHuyen);
                    $("#cbb_QuanHuyen_Gieng").html(htmlHuyen);
                }
            });

            HanhChinhHuyenFeatureLayer.clearSelection();
        }
        $("#cbb_QuanHuyen_LuuVucThoatNuoc").change(function () {

            var dID = $(this).val();
            getHanhChinhXa(dID, "cbb_PhuongXa_LuuVucThoatNuoc");
        });
        $("#cbb_QuanHuyen_KhuVucNgap").change(function () {

            var dID = $(this).val();
            getHanhChinhXa(dID, "cbb_PhuongXa_KhuVucNgap");
        });
        $("#cbb_QuanHuyen_TramBom").change(function () {

            var dID = $(this).val();
            getHanhChinhXa(dID, "cbb_PhuongXa_TramBom");
        });
        $("#cbb_QuanHuyen_TramXLNT").change(function () {

            var dID = $(this).val();
            getHanhChinhXa(dID, "cbb_PhuongXa_TramXLNT");
        });
        $("#cbb_QuanHuyen_BeChua").change(function () {

            var dID = $(this).val();
            getHanhChinhXa(dID, "cbb_PhuongXa_BeChua");
        });
        $("#cbb_QuanHuyen_CongThoatNuoc").change(function () {

            var dID = $(this).val();
            getHanhChinhXa(dID, "cbb_PhuongXa_CongThoatNuoc");
        });
        $("#cbb_QuanHuyen_MoiNoiCong").change(function () {

            var dID = $(this).val();
            getHanhChinhXa(dID, "cbb_PhuongXa_MoiNoiCong");
        });
        $("#cbb_QuanHuyen_MiengXa").change(function () {

            var dID = $(this).val();
            getHanhChinhXa(dID, "cbb_PhuongXa_MiengXa");
        });
        $("#cbb_QuanHuyen_HoGa").change(function () {

            var dID = $(this).val();
            getHanhChinhXa(dID, "cbb_PhuongXa_HoGa");
        });
        $("#cbb_QuanHuyen_Gieng").change(function () {

            var dID = $(this).val();
            getHanhChinhXa(dID, "cbb_PhuongXa_Gieng");
        });
        function getHanhChinhXa(quanhuyen, cbb) {
            var query = new Query();
            query.where = "MaHuyenTP = '" + quanhuyen + "'";
            var htmlHuyen = "<option value=''>Chọn phường / xã </option>";
            HanhChinhXaFeatureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {

                if (results.length > 0) {
                    for (var i = 0; i < results.length; i++) {
                        var feat = results[i];
                        var attr = feat.attributes;
                        htmlHuyen += "<option value='" + attr["MaPhuongXa"] + "'>" + attr["TenXa"] + "</option>";
                    }
                    $("#" + cbb + "").html(htmlHuyen);
                }
            });

            HanhChinhXaFeatureLayer.clearSelection();
        }
        new SearchLayer(map);
        var classDataLayer = "";



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