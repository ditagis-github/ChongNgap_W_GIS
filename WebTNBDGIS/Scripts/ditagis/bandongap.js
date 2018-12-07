require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/MapImageLayer",
    "esri/layers/ImageryLayer",
    "esri/layers/support/RasterFunction",
    "esri/core/watchUtils",
    "esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/widgets/Expand",
    "dojo/domReady!"
], function (Map, MapView, FeatureLayer, MapImageLayer, ImageryLayer,
    RasterFunction, watchUtils, Legend, LayerList,Expand


) {
        var colorRF = new RasterFunction({
            functionName: "Stretched",
            variableName: "Raster"
        });
        var color1 = "rgb(191, 255, 232)";
        var color2 = "rgb(108,247,255)";
        var color3 = "rgb(44,180,230)";
        var color4 = "rgb(0,129,255)";
        var color5 = "rgb(0,0,255)";
        var color6 = "rgb(0,0,141)";

        var valueExpression = getExpressionValues("D01");
        var renderer = {
            type: "unique-value",  // autocasts as new UniqueValueRenderer()
            field: "D01",
            valueExpression: valueExpression,
            uniqueValueInfos: [{
                value: "1",
                symbol: getSymbol(color1),
                label: "0.0 - 0.1"
            }, {
                value: "2",
                symbol: getSymbol(color2),
                label: "0.1 - 0.2"
            }, {
                value: "3",
                symbol: getSymbol(color3),
                label: "0.2 - 0.5"
            }, {
                value: "4",
                symbol: getSymbol(color4),
                label: "0.5 - 1.0"
            }, {
                value: "5",
                symbol: getSymbol(color5),
                label: "1.0 - 2.0"
            }, {
                value: "6",
                symbol: getSymbol(color6),
                label: "2.0 - 3.0"
            }]
        };
        var tuyenDuongNgap_IL = new FeatureLayer({
            url: "http://ditagis.com/arcgis/rest/services/BD_ChongNgap/Ngap1D/MapServer/0",
            title: "Mức độ tuyến đường ngập",
            visible: false,
            renderer: renderer
        });

        var mucDoVungNgap_IL = new ImageryLayer({
            url: "http://ditagis.com/arcgis/rest/services/BD_ChongNgap/N/ImageServer",
            renderingRule: colorRF,
            definitionExpression: "Name = 'N01'",
            title: "Mức độ vùng ngập",
        });

        var baseMap_MIL = new MapImageLayer({
            url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/BaseMap_BanDoNgap/MapServer",
            visible: false,
            title: "Bản đồ nền",
        });

        /*************************
         * Add image layer to map
         ************************/

        var map = new Map({
            basemap: "gray",
            layers: [baseMap_MIL, tuyenDuongNgap_IL, mucDoVungNgap_IL]
        });

        var view = new MapView({
            container: "mapDiv",
            map: map,
            center: [106.6276006, 11.2120527],
            ui: { components: [] },
            zoom: 10
        });
        var legend = new Legend({
            view: view,
            layerInfos: [{
                layer: tuyenDuongNgap_IL,
            }, {
                layer: mucDoVungNgap_IL,
            }],
        });

        view.ui.add(legend, "top-right");

        view.when(function () {
            var layerList = new LayerList({
                view: view
            });
            var expand = new Expand({
                view: view,
                content: layerList
            });
            view.ui.add(expand, "top-left");
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
        function getSymbol(color) {
            var symbol = {
                type: "simple-line",  // autocasts as new SimpleLineSymbol()
                color: color,
                width: 1,
                miterLimit: 7.5,
                style: "solid",
                cap: "round"
            };
            return symbol;
        }
        function getExpressionValues(field) {
            var attr = `$feature.${field}`;
            var ValueInfo1 = `(${attr} >= 0 && ${attr} <= 0.1),'1'`;
            var ValueInfo2 = `${attr} > 0.1 && ${attr} <= 0.2,'2'`;
            var ValueInfo3 = `${attr} > 0.2 && ${attr} <= 0.5,'3'`;
            var ValueInfo4 = `${attr} > 0.5 && ${attr} <= 1,'4'`;
            var ValueInfo5 = `${attr} > 1 && ${attr} <= 2,'5'`;
            var ValueInfo6 = `${attr} > 2 && ${attr} <= 3,'6'`;
            var valueExpression = `When(${ValueInfo1},${ValueInfo2},${ValueInfo3},${ValueInfo4},${ValueInfo5},${ValueInfo6},'7')`;
            return valueExpression;

        }
        function GetDataQuery() {
            var datas = [];
            var cur_Day = new Date();
            var hours = cur_Day.getHours() + 1;
            for (var i = hours; i < 24; i++) {
                var data = {};
                if (i < 10) {
                    data.Time = "0" + i;
                }
                else data.Time = "" + i;
                data.Value = getValue(datas.length + 1);
                datas.push(data);
            }
            for (var i = 0; i < 24; i++) {
                if (datas.length > 23) break;
                var data = {};
                if (i < 10) {
                    data.Time = "0" + i;
                }
                else data.Time = "" + i;
                data.Value = getValue(datas.length + 1);
                datas.push(data);
            }
            return datas;
        }
        function getValue(length) {
            var value;
            if (length < 10) {
                value = "0" + length;
            }
            else value = "" + length;
            return value;
        }
        function InitializeTimeline() {
            // Set timeline width based on number of months spanned adding one month for buffer
            var datas = GetDataQuery();
            var width = ($(window).width() - 150) / 24;

            for (const index in datas) {
                let class_Name = 'event-marker';
                var data = datas[index];
                var i = parseInt(index);
                $("#ticks").append(
                    "<li class='timeline-tick' style='left: " + ((i * width) + 50) + "px'><span class='tick-label'>" + data.Time + "</span></li>"
                );
                if (i == 0) class_Name += ' selected';
                eventMarker =
                    "<li class='" + class_Name +
                    "' style='left: " +
                    ((i * width) + 46) +
                    "px' title='" +
                    data.Value +
                    "' data-id='" +
                    data.Value +
                    "'></li>";
                $("#eventList").append(eventMarker);
            }

        }

        function AddEventHandlers() {
            $(".event-marker").click(function () {
                if (!mucDoVungNgap_IL.visible) return;
                // Change marker
                $(".event-marker").removeClass("selected");
                $(this).addClass("selected");
                var element = $("#timelineContainer");
                kendo.ui.progress(element, true);
                // Show event detail
                var eventId = $(this).attr("data-id");
                var definitionExpression = `Name = 'N${eventId}'`;
                mucDoVungNgap_IL.definitionExpression = definitionExpression;
                tuyenDuongNgap_IL.renderer.valueExpression = getExpressionValues(`'D${eventId}'`);
                view.goTo(view.center);
            });
        }

        $(document).ready(function () {

            InitializeTimeline();
            AddEventHandlers();

        });

    });
