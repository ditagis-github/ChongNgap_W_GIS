require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/MapImageLayer",
    "esri/core/watchUtils",
    "esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/widgets/Expand",
    "esri/widgets/Print",
    "esri/widgets/Locate",
    "esri/widgets/BasemapToggle",
    "ditagis/widgets/LayerEditor",
    "ditagis/capnhatthongtin/Popup",
    "ditagis/tools/LocationPoint",
    "dojo/domReady!"
], function (Map, MapView, FeatureLayer, MapImageLayer,
    watchUtils,
        Legend, LayerList, Expand, Print, Locate, BasemapToggle,
    LayerEditor,Popup,LocationPoint


) {
        var diemNgap_FL = new FeatureLayer({
            id: "diemngap",
            title: "Điểm ngập",
            outFields: ['*'],
            visible: true,
            url: 'https://ditagis.com/arcgis/rest/services/BD_ChongNgap/ThongTinNgap/FeatureServer/0',
            permission: {
                create: true,
                view: true,
                delete: true,
                edit: true
            }
        });
        var mucDoVungNgap_IL = new FeatureLayer({
            url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/ThongTinNgap/FeatureServer/1",
            title: "Vùng ngập",
            id: "vungngap",
            outFields: ['*'],
            visible: true,
            permission: {
                create: true,
                view: true,
                delete: true,
                edit: true
            }
        });

        var baseMap_MIL = new MapImageLayer({
            url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/BaseMap_BanDoNgap/MapServer",
            visible: false,
            title: "Bản đồ nền",
            id: "BASEMAP",
        });

        /*************************
         * Add image layer to map
         ************************/

        var map = new Map({
            basemap: "hybrid",
            layers: [baseMap_MIL, diemNgap_FL, mucDoVungNgap_IL]
        });

        var view = new MapView({
            container: "mapDiv",
            map: map,
            center: [106.6276006, 11.2120527],
            ui: { components: [] },
            zoom: 10
        });
        view.when(function () {
            var popup = new Popup(view);
            popup.startup();
            var legend = new Legend({
                view: view,
                layerInfos: [{
                    layer: diemNgap_FL,
                }, {
                    layer: mucDoVungNgap_IL,
                }],
            });
            var legendExpand = new Expand({
                view: view,
                content: legend,
                expandTooltip: "Chú thích",
            });
            var layerList = new LayerList({
                view: view
            });
            var layerListExpand = new Expand({
                view: view,
                content: layerList,
                expandTooltip: "Lớp dữ liệu",
            });

            var print = new Print({
                view: view,
                printServiceUrl: "https://ditagis.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
            });
            var printExpand = new Expand({
                view: view,
                content: print,
                expandTooltip: "In",
            });
            var locate = new Locate({
                view: view
            })
            view.ui.add(locate, "top-left");
            view.ui.add(new BasemapToggle({ view, nextBasemap:'streets-night-vector' }), "bottom-left");
            view.ui.add(layerListExpand, "top-left");
            view.ui.add(legendExpand, "top-left");
            view.ui.add(printExpand, "top-left");
            var layerEditor = new LayerEditor(view);
            layerEditor.startup();
            layerEditor.on("draw-finish", function (e) {
            });
            var locationPoint = new LocationPoint(view);
            locationPoint.start();
        });
        mucDoVungNgap_IL.on("layerview-create", (event) => {
            // The LayerView for the layer that emitted this event
            watchUtils.watch(event.layerView, 'updating', (newVal, oldVal) => {
                var element = $("#timelineContainer");
                if (!newVal) {
                    kendo.ui.progress(element, false);
                }
            })

        });




    });
