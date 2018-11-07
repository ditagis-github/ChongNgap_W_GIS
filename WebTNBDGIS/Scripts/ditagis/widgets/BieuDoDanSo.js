
define([
    "ditagis/configs",
    "dojo/dom", "dojo/on",
    "esri/tasks/query", "esri/tasks/QueryTask",
    "dojo/dom-construct", "dojo/domReady!"
],
    function (configs,dom, on, Query, QueryTask,
        domConstruct) {
        class BieuDoDanSo {
            constructor() {
                var url = configs.tables["DanSo"].url;
                this.queryTask = new QueryTask(url);
                this.query = new Query();
                this.query.returnGeometry = false;
                this.query.outFields = ["*"];
                this.initChart();
            }
            initChart() {
                this.chart_window = $('<div/>', {
                    id: "chart-content-danso"
                }).appendTo(document.body);
                var content = domConstruct.create('div', {
                    id: 'content-danso'
                });
                this.chart_window.append(content);
                this.chart_window.kendoWindow({
                    width: 900,
                    visible: false,
                    position: {
                        left: -0.5,
                        top: 96
                    },
                    actions: [
                        "Pin",
                        "Minimize",
                        "Maximize",
                        "Close"
                    ],
                });
            }

            queryFeatureTable(selectFeature) {
                var seriesData = [];
                var attributes = selectFeature.attributes;
                this.chart_window.data("kendoWindow").open();
                this.chart_window.data("kendoWindow").setOptions({
                    title: "Biểu đồ dân số huyện " + attributes["TenHuyen"],
                });

                // this.query.objectIds = [attributes[OBJECTID]];
                this.query.where = "MaHuyenTP = " + attributes["MaHuyenTP"];
                this.queryTask.execute(this.query, (results) => {
                    var features = results.features;
                    for (const feature of features) {
                        var attributes = feature.attributes;
                        seriesData.push({
                            Nam: "Năm " + attributes["Nam"],
                            DanSo: attributes["DanSo"],
                        }); 
                    }
                    
                    this.showChart(seriesData);
                });

            }
            showChart(seriesData) {
                console.log(seriesData);
                $("#content-danso").kendoChart({
                    dataSource: {
                        data: seriesData,
                        sort: {
                            field: "Nam",
                            dir: "asc"
                        }
                    },
                    series: [{
                        type: "column",
                        field: "DanSo",
                        categoryField: "Nam",
                        labels: {  
                            visible: true,  
                        }  
                    }],
                    // seriesColors: ['#1a237e'],
                });
            }
        };
        return BieuDoDanSo;
    });
