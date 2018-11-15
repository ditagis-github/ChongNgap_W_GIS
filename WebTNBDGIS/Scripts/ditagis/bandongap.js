require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/ImageryLayer",
    "esri/layers/support/RasterFunction",
    "esri/layers/support/MosaicRule",
    "esri/core/watchUtils",
    "esri/widgets/Legend",
    "dojo/domReady!"
], function (Map, MapView, ImageryLayer,
    RasterFunction, MosaicRule, watchUtils,Legend


) {

        var colorRF = new RasterFunction({
            functionName: "Stretched",
            variableName: "Raster"
        });

        var layer = new ImageryLayer({
            url: "http://ditagis.com/arcgis/rest/services/BD_ChongNgap/N/ImageServer",
            renderingRule: colorRF,
            definitionExpression: "Name = 'N00'"
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
        var legend = new Legend({
            view: view,
            layerInfos: [{
              layer: layer,
              title: "Legend"
            }]
          });
          
          view.ui.add(legend, "top-right");
        layer.on("layerview-create", (event) => {
            // The LayerView for the layer that emitted this event
            watchUtils.watch(event.layerView, 'updating', (newVal, oldVal) => {
                var element = $("#timelineContainer");
                if (!newVal) {
                    kendo.ui.progress(element, false);
                }
            })

        });
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
            var width = ($(window).width() - 150)/24;
            for (const index in datas) {
                var data = datas[index];
                var i = parseInt(index);
                $("#ticks").append(
                    "<li class='timeline-tick' style='left: " + ((i * width) + 50) + "px'><span class='tick-label'>" + data.Time + "</span></li>"
                );
                eventMarker =
                    "<li class='event-marker" +
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
                // Change marker
                $(".event-marker").removeClass("selected");
                $(this).addClass("selected");
                var element = $("#timelineContainer");
                kendo.ui.progress(element, true);
                // Show event detail
                var eventId = $(this).attr("data-id");
                    var definitionExpression = `Name = 'N${eventId}'`;
                    layer.definitionExpression = definitionExpression;
                    view.goTo(view.center);
            });
        }

        $(document).ready(function () {

            InitializeTimeline();
            AddEventHandlers();

        });

    });
