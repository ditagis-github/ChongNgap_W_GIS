require([


    "esri/toolbars/navigation", "dijit/registry", "dojo/on",
    "esri/map", "esri/graphic",
    "esri/SpatialReference",
    "esri/request", "esri/config", "esri/Color",
    "esri/layers/FeatureLayer", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/ImageParameters",
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
], function (
    Navigation, registry, on,
    Map, Graphic,
    SpatialReference,
    esriRequest, esriConfig, Color,
    FeatureLayer, ArcGISDynamicMapServiceLayer, ImageParameters,
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

        var spatialReference = new SpatialReference({
            "wkt": 'PROJCS["HCM-vn2000",GEOGCS["GCS_VN_2000",DATUM["D_Vietnam_2000",SPHEROID["WGS_1984",6378137.0,298.257223563]],' +
                'PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Transverse_Mercator"],PARAMETER["False_Easting",500000.0],' +
                'PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",105.75],PARAMETER["Scale_Factor",0.9999],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]'
        });

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
                outFields: ["*"]
            });

        var HanhChinhXaFeatureLayer = new FeatureLayer(linkHanhChinhXa,
            {
                mode: FeatureLayer.MODE_ONEDEMAND,
                outFields: ["*"]
            });

        var TramBomFeatureLayer = new FeatureLayer(varLinkTramBom,
            {
                mode: FeatureLayer.MODE_ONEDEMAND,
                outFields: ["*"]
            });

        var MoiNoiCongTNFeatureLayer = new FeatureLayer(varLinkMoiNoiCongTN,
            {
                mode: FeatureLayer.MODE_ONEDEMAND,
                outFields: ["*"]
            });
        var MiengXaFeatureLayer = new FeatureLayer(varLinkMiengXa,
            {
                mode: FeatureLayer.MODE_ONEDEMAND,
                outFields: ["*"]
            });
        var HoGaFeatureLayer = new FeatureLayer(varLinkHoGa,
            {
                mode: FeatureLayer.MODE_ONEDEMAND,
                outFields: ["*"]
            });
        var GiengFeatureLayer = new FeatureLayer(varLinkGieng,
            {
                mode: FeatureLayer.MODE_ONEDEMAND,
                outFields: ["*"]
            });
        var BeChuaFeatureLayer = new FeatureLayer(varLinkBeChua,
            {
                mode: FeatureLayer.MODE_ONEDEMAND,
                outFields: ["*"]
            });
        var CongThoatNuocFeatureLayer = new FeatureLayer(varLinkCongThoatNuoc,
            {
                mode: FeatureLayer.MODE_ONEDEMAND,
                outFields: ["*"]
            });
        var KhuVucNgapFeatureLayer = new FeatureLayer(varLinkKhuVucNgap,
            {
                mode: FeatureLayer.MODE_ONEDEMAND,
                outFields: ["*"]
            });
        var TramXLNTFeatureLayer = new FeatureLayer(varLinkTramXLNT,
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


        var style_point = new SimpleMarkerSymbol({
            "color": [127, 255, 255, 255], "size": 10, "type": "esriSMS", "style": "esriSMSCircle", "outline": {
                "color": [0, 0, 0, 255], "width": 1, "type": "esriSLS", "style": "esriSLSSolid"
            }
        });

        var selectionSymbol = new SimpleFillSymbol(
            SimpleFillSymbol.STYLE_NULL, new SimpleLineSymbol("solid", new Color([127, 255, 255, 255]), 10), null
        );

        var style_polygon = new SimpleFillSymbol().setColor(new Color([174, 12, 229, 0.5]));

        LuuVucThoatNuocFeatureLayer.setSelectionSymbol(style_polygon);
        KhuVucNgapFeatureLayer.setSelectionSymbol(style_polygon);
        TramBomFeatureLayer.setSelectionSymbol(style_point);
        TramXLNTFeatureLayer.setSelectionSymbol(style_polygon);
        BeChuaFeatureLayer.setSelectionSymbol(style_point);
        CongThoatNuocFeatureLayer.setSelectionSymbol(selectionSymbol);
        MoiNoiCongTNFeatureLayer.setSelectionSymbol(style_point);
        MiengXaFeatureLayer.setSelectionSymbol(style_point);
        HoGaFeatureLayer.setSelectionSymbol(style_point);
        GiengFeatureLayer.setSelectionSymbol(style_point);

        map.addLayer(baseMapServiceLayer);

        map.addLayers([LuuVucThoatNuocFeatureLayer, KhuVucNgapFeatureLayer, TramBomFeatureLayer, TramXLNTFeatureLayer,
            BeChuaFeatureLayer, CongThoatNuocFeatureLayer,
            MoiNoiCongTNFeatureLayer, MiengXaFeatureLayer, HoGaFeatureLayer, GiengFeatureLayer]);

        map.on("layers-add-result", initEditor);

        var centerStart = new esri.geometry.Point(602626.795, 1228203.586, map.SpatialReference);
        map.centerAt(centerStart);
        map.setScale(500000);


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
            $(".left_panel").slideUp();
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
            }, dom.byId("print_button"));
            printer.startup();
        }

        function handleError(err) {
            console.log("Something broke: ", err);
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
            PrjParams.outSR = spatialReference;
            console.log(location.coords.accuracy);
            console.log(location.coords.altitude);
            console.log(location.coords.heading);

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

        function initEditor(evt) {

            //var html = "";
            //html += "<option value='LuuVucThoatNuoc'>" + LuuVucThoatNuocFeatureLayer.name + "</option>";
            //html += "<option value='KhuVucNgap'>" + KhuVucNgapFeatureLayer.name + "</option>";
            //html += "<option value='TramBom'>" + TramBomFeatureLayer.name + "</option>";
            //html += "<option value='TramXLNT'>" + TramXLNTFeatureLayer.name + "</option>";
            //html += "<option value='BeChua'>" + BeChuaFeatureLayer.name + "</option>";
            //html += "<option value='CongThoatNuoc'>" + CongThoatNuocFeatureLayer.name + "</option>";
            //html += "<option value='MoiNoiCong'>" + MoiNoiCongTNFeatureLayer.name + "</option>";
            //html += "<option value='MiengXa'>" + MiengXaFeatureLayer.name + "</option>";
            //html += "<option value='HoGa'>" + HoGaFeatureLayer.name + "</option>";
            //html += "<option value='Gieng'>" + GiengFeatureLayer.name + "</option>";

            //$("#classDataLayer").html(html);

            var domainData;
            var valueDomain;
            // lấy value dommain
            domainData = LuuVucThoatNuocFeatureLayer.getDomain("DonViQuanLy");
            valueDomain = domainData.codedValues;
            var DonViQL = "<option value=''> Chọn đơn vị quản lý </option>";
            for (var x = 0; x < valueDomain.length; x++) {
                DonViQL += "<option value='" + valueDomain[x].code + "'>" + valueDomain[x].name + "</option>";
            }
            $("#cbb_DVQuanLy_LuuVucThoatNuoc").html(DonViQL);
            $("#cbb_DVQuanLy_KhuVucNgap").html(DonViQL);
            $("#cbb_DVQuanLy_TramBom").html(DonViQL);
            $("#cbb_DVQuanLy_TramXLNT").html(DonViQL);
            $("#cbb_DVQuanLy_BeChua").html(DonViQL);
            $("#cbb_DVQuanLy_CongThoatNuoc").html(DonViQL);
            $("#cbb_DVQuanLy_MoiNoiCong").html(DonViQL);
            $("#cbb_DVQuanLy_MiengXa").html(DonViQL);
            $("#cbb_DVQuanLy_HoGa").html(DonViQL);
            $("#cbb_DVQuanLy_Gieng").html(DonViQL);

            getHanhChinhHuyen();

            var map = this;

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

                    //add a save button next to the delete button
                    //var saveButton = new Button({ label: "Lưu", "class": "saveButton" }, domConstruct.create("div"));
                    //domConstruct.place(saveButton.domNode, attInspector.deleteBtn.domNode, "after");

                    //var featUpdate;

                    //saveButton.on("click", function () {
                    //    featUpdate.getLayer().applyEdits(null, [featUpdate], null);
                    //    featUpdate.getLayer().refresh();
                    //});

                    //dojo.connect(attInspector, "onAttributeChange", function (feature, fieldName, newFieldValue) {
                    //    //store the updates to apply when the save button is clicked 
                    //    featUpdate.attributes[fieldName] = newFieldValue;
                    //});

                    //dojo.connect(attInspector, "onDelete", function (feature) {
                    //    feature.getLayer().applyEdits(null, null, [feature]);
                    //    map.infoWindow.hide();
                    //});

                });
            });

            map.on("click", function (evt) {
                map.graphics.clear();
            });

            map.infoWindow.on("hide", function () {
                LuuVucThoatNuocFeatureLayer.clearSelection();
                KhuVucNgapFeatureLayer.clearSelection();
                TramBomFeatureLayer.clearSelection();
                TramXLNTFeatureLayer.clearSelection();
                BeChuaFeatureLayer.clearSelection();
                CongThoatNuocFeatureLayer.clearSelection();
                MoiNoiCongTNFeatureLayer.clearSelection();
                MiengXaFeatureLayer.clearSelection();
                HoGaFeatureLayer.clearSelection();
                GiengFeatureLayer.clearSelection();
            });

        }

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

        var classDataLayer = "";

        $(".searchData").click(function () {
            var dID = $(this).attr('title');

            var title = $(this).text();

            $("#titleSearchHeader").html("Tìm kiếm " + title);

            //alert(dID);
            classDataLayer = dID;

            $(".SearchPanel_Content").removeClass("display");
            $(".SearchPanel_Content").addClass("undisplay");
            $("#SearchPanel_" + dID + "_Content").removeClass("undisplay");
            $("#SearchPanel_" + dID + "_Content").addClass("display");

            $("#result_SearchData_Content").html("");
            $("#resultCount").html("");
            //var height = $(document).height();
            //var hesub = $("#SearchPanel_" + dID + "_Content").height();
            //height = height - hesub - 100;
            //if (height < 200) {
            //    height = 200;
            //}
            //$("#result_SearchData").css("height", height + "px");


            $(".left_panel").slideUp();
            $("#SearchPanel").slideDown();


        });

        $("#distanceButton").click(function (evt) {
            $("#SearchPanel").slideUp();
            $("#LayerList").slideUp();
            $("#PrintPanel").slideUp();
            $("#LayerLegend").slideUp();
            $("#DistancePanel").slideDown();
        });

        $("#listLayerButton").click(function (evt) {
            $("#SearchPanel").slideUp();
            $("#PrintPanel").slideUp();
            $("#DistancePanel").slideUp();
            $("#LayerLegend").slideUp();
            $("#LayerList").slideDown();
        });


        $("#legendLayerButton").click(function (evt) {
            $("#SearchPanel").slideUp();
            $("#PrintPanel").slideUp();
            $("#DistancePanel").slideUp();
            $("#LayerList").slideUp();
            $("#LayerLegend").slideDown();
        });

        $("#printButton").click(function (evt) {
            $("#SearchPanel").slideUp();
            $("#LayerList").slideUp();
            $("#DistancePanel").slideUp();
            $("#LayerLegend").slideUp();
            $("#PrintPanel").slideDown();
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

        $("#btSearch").click(function (evt) {
            var url;

            $("#result_SearchData_Content").html("");
            $("#resultCount").html("Vui lòng đợi trong giây lát....");

            $("#loading").removeClass("undisplay");
            $("#loading").addClass("display");

            var dID = classDataLayer;
            if (dID == "BeChua") {
                var cbb_DVQuanLy_BeChua = $("#cbb_DVQuanLy_BeChua").val();
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_BeChua").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_BeChua").val();
                url = urlLocation + "/Home/getHIENTRANG_BECHUA";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { DVQuanLy: cbb_DVQuanLy_BeChua, QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }

                });
            }
            if (dID == "Gieng") {
                var cbb_DVQuanLy_BeChua = $("#cbb_DVQuanLy_Gieng").val();
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_Gieng").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_Gieng").val();
                url = urlLocation + "/Home/getHIENTRANG_GIENG";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { DVQuanLy: cbb_DVQuanLy_BeChua, QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }
                });
            }
            if (dID == "LuuVucThoatNuoc") {
                var cbb_DVQuanLy_BeChua = $("#cbb_DVQuanLy_LuuVucThoatNuoc").val();
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_LuuVucThoatNuoc").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_LuuVucThoatNuoc").val();
                url = urlLocation + "/Home/getHIENTRANG_LUUVUCTHOATNUOC";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { DVQuanLy: cbb_DVQuanLy_BeChua, QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }
                });
            }
            if (dID == "KhuVucNgap") {
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_KhuVucNgap").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_KhuVucNgap").val();
                url = urlLocation + "/Home/getHIENTRANG_KHUVUCNGAP";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }
                });
            }
            if (dID == "TramBom") {
                var cbb_DVQuanLy_BeChua = $("#cbb_DVQuanLy_TramBom").val();
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_TramBom").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_TramBom").val();
                url = urlLocation + "/Home/getHIENTRANG_TRAMBOM";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { DVQuanLy: cbb_DVQuanLy_BeChua, QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }
                });
            }
            if (dID == "TramXLNT") {
                var cbb_DVQuanLy_BeChua = $("#cbb_DVQuanLy_TramXLNT").val();
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_TramXLNT").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_TramXLNT").val();
                url = urlLocation + "/Home/getHIENTRANG_TRAMXLNT";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { DVQuanLy: cbb_DVQuanLy_BeChua, QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }
                });
            }
            if (dID == "CongThoatNuoc") {
                var cbb_DVQuanLy_BeChua = $("#cbb_DVQuanLy_CongThoatNuoc").val();
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_CongThoatNuoc").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_CongThoatNuoc").val();
                url = urlLocation + "/Home/getHIENTRANG_CONGTHOATNUOC";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { DVQuanLy: cbb_DVQuanLy_BeChua, QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }
                });
            }
            if (dID == "MoiNoiCong") {
                var cbb_DVQuanLy_BeChua = $("#cbb_DVQuanLy_MoiNoiCong").val();
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_MoiNoiCong").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_MoiNoiCong").val();
                url = urlLocation + "/Home/getHIENTRANG_MOINOITHOATNUOC";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { DVQuanLy: cbb_DVQuanLy_BeChua, QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }
                });
            }
            if (dID == "MiengXa") {
                var cbb_DVQuanLy_BeChua = $("#cbb_DVQuanLy_MiengXa").val();
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_MiengXa").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_MiengXa").val();
                url = urlLocation + "/Home/getHIENTRANG_MIENGXA";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { DVQuanLy: cbb_DVQuanLy_BeChua, QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }
                });
            }
            if (dID == "HoGa") {
                var cbb_DVQuanLy_BeChua = $("#cbb_DVQuanLy_HoGa").val();
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_HoGa").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_HoGa").val();
                url = urlLocation + "/Home/getHIENTRANG_HOGA";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { DVQuanLy: cbb_DVQuanLy_BeChua, QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }
                });
            }
        });

        $("#btExportExcel").click(function (evt) {
            var url;

            $("#result_SearchData_Content").html("");
            $("#resultCount").html("Vui lòng đợi trong giây lát....");

            $("#loading").removeClass("undisplay");
            $("#loading").addClass("display");

            var dID = $("#classDataLayer").val();
            if (dID == "BeChua") {
                var cbb_DVQuanLy_BeChua = $("#cbb_DVQuanLy_BeChua").val();
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_BeChua").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_BeChua").val();
                url = urlLocation + "/Home/getHIENTRANG_BECHUA";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { DVQuanLy: cbb_DVQuanLy_BeChua, QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }

                });
            }
            if (dID == "Gieng") {
                var cbb_DVQuanLy_BeChua = $("#cbb_DVQuanLy_Gieng").val();
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_Gieng").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_Gieng").val();
                url = urlLocation + "/Home/getHIENTRANG_GIENG";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { DVQuanLy: cbb_DVQuanLy_BeChua, QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }
                });
            }
            if (dID == "LuuVucThoatNuoc") {
                var cbb_DVQuanLy_BeChua = $("#cbb_DVQuanLy_LuuVucThoatNuoc").val();
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_LuuVucThoatNuoc").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_LuuVucThoatNuoc").val();
                url = urlLocation + "/Home/getHIENTRANG_LUUVUCTHOATNUOC";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { DVQuanLy: cbb_DVQuanLy_BeChua, QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }
                });
            }
            if (dID == "KhuVucNgap") {
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_KhuVucNgap").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_KhuVucNgap").val();
                url = urlLocation + "/Home/getHIENTRANG_KHUVUCNGAP";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }
                });
            }
            if (dID == "TramBom") {
                var cbb_DVQuanLy_BeChua = $("#cbb_DVQuanLy_TramBom").val();
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_TramBom").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_TramBom").val();
                url = urlLocation + "/Home/getHIENTRANG_TRAMBOM";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { DVQuanLy: cbb_DVQuanLy_BeChua, QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }
                });
            }
            if (dID == "TramXLNT") {
                var cbb_DVQuanLy_BeChua = $("#cbb_DVQuanLy_TramXLNT").val();
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_TramXLNT").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_TramXLNT").val();
                url = urlLocation + "/Home/getHIENTRANG_TRAMXLNT";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { DVQuanLy: cbb_DVQuanLy_BeChua, QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }
                });
            }
            if (dID == "CongThoatNuoc") {
                var cbb_DVQuanLy_BeChua = $("#cbb_DVQuanLy_CongThoatNuoc").val();
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_CongThoatNuoc").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_CongThoatNuoc").val();
                url = urlLocation + "/Home/getHIENTRANG_CONGTHOATNUOC";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { DVQuanLy: cbb_DVQuanLy_BeChua, QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }
                });
            }
            if (dID == "MoiNoiCong") {
                var cbb_DVQuanLy_BeChua = $("#cbb_DVQuanLy_MoiNoiCong").val();
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_MoiNoiCong").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_MoiNoiCong").val();
                url = urlLocation + "/Home/getHIENTRANG_MOINOITHOATNUOC";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { DVQuanLy: cbb_DVQuanLy_BeChua, QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }
                });
            }
            if (dID == "MiengXa") {
                var cbb_DVQuanLy_BeChua = $("#cbb_DVQuanLy_MiengXa").val();
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_MiengXa").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_MiengXa").val();
                url = urlLocation + "/Home/getHIENTRANG_MIENGXA";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { DVQuanLy: cbb_DVQuanLy_BeChua, QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }
                });
            }
            if (dID == "HoGa") {
                var cbb_DVQuanLy_BeChua = $("#cbb_DVQuanLy_HoGa").val();
                var cbb_QuanHuyen_BeChua = $("#cbb_QuanHuyen_HoGa").val();
                var cbb_PhuongXa_BeChua = $("#cbb_PhuongXa_HoGa").val();
                url = urlLocation + "/Home/getHIENTRANG_HOGA";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { DVQuanLy: cbb_DVQuanLy_BeChua, QuanHuyen: cbb_QuanHuyen_BeChua, PhuongXa: cbb_PhuongXa_BeChua },
                    cache: false,
                    success: function (data) {

                        var html = "";
                        for (var x = 0; x < data.length; x++) {
                            html += "<div alt=" + data[x].OBJECTID + " class='item'>" + data[x].OBJECTID + " - " + data[x].MaDoiTuong + "</div>";
                        }
                        $("#result_SearchData_Content").html(html);
                        $("#resultCount").html(" Có " + data.length + " đối tượng được tìm thấy.");

                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    },
                    error: function (reponse) {
                        alert("error : " + reponse.responseText);
                        $("#loading").removeClass("display");
                        $("#loading").addClass("undisplay");
                    }
                });
            }
        });

        $("#result_SearchData_Content").on("click", "div.item", function () {
            var dID = classDataLayer;
            var objectID = $(this).attr('alt');
            if (dID == "BeChua") {
                zoomRowPoint(objectID, BeChuaFeatureLayer);
            }
            if (dID == "Gieng") {
                zoomRowPoint(objectID, GiengFeatureLayer);
            }
            if (dID == "LuuVucThoatNuoc") {
                zoomRowPolygon(objectID, LuuVucThoatNuocFeatureLayer);
            }
            if (dID == "KhuVucNgap") {
                zoomRowPolygon(objectID, KhuVucNgapFeatureLayer);
            }
            if (dID == "TramBom") {
                zoomRowPoint(objectID, TramBomFeatureLayer);
            }
            if (dID == "TramXLNT") {
                zoomRowPolygon(objectID, TramXLNTFeatureLayer);
            }
            if (dID == "CongThoatNuoc") {
                zoomRowPolygon(objectID, CongThoatNuocFeatureLayer);
            }
            if (dID == "MoiNoiCong") {
                zoomRowPoint(objectID, MoiNoiCongTNFeatureLayer);
            }
            if (dID == "MiengXa") {
                zoomRowPoint(objectID, MiengXaFeatureLayer);
            }
            if (dID == "HoGa") {
                zoomRowPoint(objectID, HoGaFeatureLayer);
            }
        });

        function zoomRowPoint(id, layerClass) {
            map.graphics.clear();
            layerClass.clearSelection();
            var query = new Query();
            query.objectIds = [id];
            layerClass.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (features) {
                if (features.length > 0) {
                    var point = features[0].geometry;
                    if (point) {
                        var pt = new Point(point.x, point.y, map.spatialReference);
                        if (pt) {
                            var extent = new Extent((point.x + 10), (point.y + 10), (point.x - 10), (point.y - 10), map.spatialReference);
                            layerClass.selectFeatures(features[0]);
                            var stateExtent = extent.expand(5.0);
                            map.setExtent(stateExtent);
                        }
                    }
                }

            });
        }

        function zoomRowPolygon(id, layerClass) {
            layerClass.clearSelection();
            map.graphics.clear();
            var query = new Query();
            query.objectIds = [id];
            layerClass.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (features) {
                //zoom to the selected feature
                layerClass.selectFeatures[features[0]];
                var stateExtent = features[0].geometry.getExtent().expand(10);
                map.setExtent(stateExtent);

                //var graphic = features[0]; //Feature is a graphic
                //graphic.setSymbol(lineSelectionSymbol);
                //map.graphics.add(graphic);

            });
        }

        ////////////////////////////////

    });