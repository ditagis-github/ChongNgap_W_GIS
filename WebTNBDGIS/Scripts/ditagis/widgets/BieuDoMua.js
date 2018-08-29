
define([
    "dojo/dom-construct",
],
    function (domConstruct) {
        class BieuDoMua {
            constructor() {
                this.chart_window = $('<div/>', {
                    id: "chart-content"
                }).appendTo(document.body);
                var content = domConstruct.create('div', {
                    id: 'content'
                });
                this.chart_window.append(content);
                this.chart_window.kendoWindow({
                    // width: "100%",
                    width: 900,
                    title: "Biểu đồ lưu lượng mưa",
                    visible: false,
                    actions: [
                        "Pin",
                        "Minimize",
                        "Maximize",
                        "Close"
                    ],
                });
            }
            startup() {
                this.chart_window.data("kendoWindow").open();
                Number.prototype.padLeft = function (base, chr) {
                    var len = (String(base || 10).length - String(this).length) + 1;
                    return len > 0 ? new Array(len).join(chr || '0') + this : this;
                }
                var seriesData = [];
                var endDate = new Date();
                var startDate = new Date();
                startDate.setDate(startDate.getDate() - 2);
                var endTime = [endDate.getFullYear().padLeft(),
                (endDate.getMonth() + 1).padLeft(),
                endDate.getDate()].join('-') + '%20' +
                    [endDate.getHours().padLeft(),
                    endDate.getMinutes().padLeft(),
                    endDate.getSeconds().padLeft()].join(':');
                var startTime = [startDate.getFullYear().padLeft(),
                (startDate.getMonth() + 1).padLeft(),
                startDate.getDate()].join('-') + '%20' +
                    [startDate.getHours().padLeft(),
                    startDate.getMinutes().padLeft(),
                    startDate.getSeconds().padLeft()].join(':');

                $.ajax({
                    url: `http://luuluongmua.quantraconline.com/api/Values/GetData?user_id=3&station_id=2&page_num=1&page_size=100&interval=60&start_time=${startTime}&end_time=${endTime}`,
                    success: (result) => {
                        if (result) {
                            console.log(result);
                            var data = result.data;
                            for (const item of data) {
                                var item_data = {
                                    PH: null,
                                    FLOW: null,
                                    time: null,
                                    date: null,
                                    time1: null,
                                };
                                var datetime = item.StrHappenedTime.split(" ");
                                item_data.PH = item.ValueDict.PH,
                                    item_data.FLOW = item.ValueDict.FLOW,
                                    // item_data.time = item.StrHappenedTime,
                                    item_data.date = datetime[0],
                                    item_data.time = datetime[1].substr(0, 3) + "00";

                                console.log(item_data.time + " " + item_data.date);
                                if (datetime[1].substr(0, 2) % 2 == 0) {
                                    seriesData.push(item_data);
                                }

                            }
                            console.log(seriesData);
                            $("#content").kendoChart({
                                legend: {
                                    position: "bottom",
                                },
                                "dataSource": {
                                    data: seriesData,
                                    group: {
                                        field: "date"
                                    }
                                },
                                valueAxis: { min: 800, max: 1200 },
                                series: [{
                                    field: "FLOW",
                                    type: "line",
                                    categoryField: "time",
                                    labels: {
                                        visible: false
                                    },
                                },
                                    // {
                                    //     field: "PH",
                                    //     type: "line",
                                    //     categoryField: "time",
                                    //     labels: {
                                    //         visible: false
                                    //     },
                                    //     name: "Khoảng cách"
                                    // }
                                ],
                                dataBound: function (e) {
                                    var axis = e.sender.options.categoryAxis;
                                    axis.categories = axis.categories.sort();
                                },
                                seriesColors: ['#b71c1c', '#1a237e', '#ff8d00'],
                                tooltip: {
                                    visible: true
                                }
                            });
                        }

                    }
                });
            }
            getStringDate() {
                var date = new Date();
                var year = date.getFullYear().toString();
                var month = (date.getMonth() + 1).toString();
                var day = date.getDate().toString();
                (day.length == 1) && (day = '0' + day);
                (month.length == 1) && (month = '0' + month);
                var rs = year + month + day;
                return rs;
            }
        };
        return BieuDoMua;
    });
