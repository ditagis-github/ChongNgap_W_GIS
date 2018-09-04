
define([
    "dojo/dom-construct",
],
    function (domConstruct) {
        class BieuDoMua {
            constructor() {
                this.chart_window = $('<div/>', {
                    id: "chart-content"
                }).appendTo(document.body);
                this.chart_window.append(domConstruct.create('span', {
                    class: "span-label",
                    innerHTML: "Từ"
                }));
                this.chart_window.append(domConstruct.create('input', {
                    id: "start",
                }));
                this.chart_window.append(domConstruct.create('span', {
                    class: "span-label",
                    innerHTML: "Đến"
                }));
                this.chart_window.append(domConstruct.create('input', {
                    id: "end",
                }));
                this.chart_window.append(domConstruct.create('button', {
                    type: "button",
                    id: "btnView",
                    innerHTML: "Xem biểu đồ",
                    class: 'k-primary'
                }));
                var end_date = kendo.toString(kendo.parseDate(new Date()), 'dd/MM/yyyy');
                var startDate = new Date();
                startDate.setDate(startDate.getDate() - 2);
                var startDate = kendo.toString(kendo.parseDate(startDate), 'dd/MM/yyyy');
                this.startDatePicker = $("#start").kendoDatePicker({
                    change: () => {
                        var startDate = this.startDatePicker.value();
                        var end_date = this.end_datePicker.value();
                        if (startDate) {
                            startDate = new Date(startDate);
                            startDate.setDate(startDate.getDate());
                            this.end_datePicker.min(startDate);
                        }
                        if (startDate > end_date) {
                            this.end_datePicker.value(startDate);
                        }
                    },
                    format: "dd/MM/yyyy",
                }).data("kendoDatePicker");
                this.startDatePicker.value(startDate);
                this.end_datePicker = $("#end").kendoDatePicker({
                    change: this.endChange,
                    format: "dd/MM/yyyy"
                }).data("kendoDatePicker");
                this.end_datePicker.value(end_date);
                this.end_datePicker.min(this.startDatePicker.value());
                this.startDatePicker.max(end_date);
                this.end_datePicker.max(end_date);
                $("#btnView").kendoButton({
                    click: () => {
                        var start_date = this.startDatePicker.value();
                        var end_date = this.end_datePicker.value();
                        this.startup(start_date, end_date);

                    }
                });
                var content = domConstruct.create('div', {
                    id: 'content'
                });
                this.chart_window.append(content);
                this.chart_window.kendoWindow({
                    width: 900,
                    title: "Biểu đồ lưu lượng mưa",
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

            startup(start_date, end_date) {
                this.interval = 60;
                this.chart_window.data("kendoWindow").open();
                Number.prototype.padLeft = function (base, chr) {
                    var len = (String(base || 10).length - String(this).length) + 1;
                    return len > 0 ? new Array(len).join(chr || '0') + this : this;
                }
                var seriesData = [];
                if (!start_date) {
                    start_date = new Date();
                    start_date.setDate(start_date.getDate() - 2);
                }
                if (!end_date) {
                    end_date = new Date();
                }
                else {
                    end_date.setDate(end_date.getDate() + 1);
                }

                if (start_date && end_date) {
                    var num_date = this.getDaysBetween(start_date, end_date);
                    if (num_date <= 4) {
                        this.interval = 60;
                    }
                    else if (num_date <= 31) {
                        this.interval = 1440;
                    }
                    else this.interval = 43200;
                }

                var endTime = [end_date.getFullYear(),
                (end_date.getMonth() + 1).padLeft(),
                end_date.getDate().padLeft()].join('-') + '%20' +
                    [end_date.getHours().padLeft(),
                    end_date.getMinutes().padLeft(),
                    end_date.getSeconds().padLeft()].join(':');
                var startTime = [start_date.getFullYear(),
                (start_date.getMonth() + 1).padLeft(),
                start_date.getDate().padLeft()].join('-') + '%20' +
                    [start_date.getHours().padLeft(),
                    start_date.getMinutes().padLeft(),
                    start_date.getSeconds().padLeft()].join(':');
                var url = `http://luuluongmua.quantraconline.com/api/Values/GetData?user_id=3&station_id=2&page_num=1&page_size=10000&interval=${this.interval}&start_time=${startTime}&end_time=${endTime}`;
                $.ajax({
                    url: url,
                    success: (result) => {
                        if (result) {
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
                                item_data.PH = item.ValueDict.PH;
                                item_data.FLOW = item.ValueDict.FLOW;
                                if (this.interval == 60) {
                                    item_data.date = datetime[0];
                                    item_data.time = datetime[1].substr(0, 3) + "00";
                                    if (datetime[1].substr(0, 2) % 2 == 0) {
                                        seriesData.push(item_data);
                                    }
                                }
                                else if (this.interval == 1440) {
                                    item_data.date = datetime[0].substr(3, datetime[0].length);
                                    item_data.time = datetime[0].substr(0, 2);
                                    seriesData.push(item_data);
                                }
                                else{
                                    item_data.date = datetime[0].substr(6, 4);
                                    item_data.time = datetime[0].substr(3, 2);
                                    seriesData.push(item_data);
                                }





                            }
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
                                seriesColors: ['#b71c1c', '#1a237e', '#ff8d00', '#5cc461'],
                                tooltip: {
                                    visible: true
                                }
                            });
                        }

                    }
                });
            }
            getDaysBetween(start_date, end_date) {
                var one_day = 1000 * 60 * 60 * 24;
                var date1_ms = start_date.getTime();
                var date2_ms = end_date.getTime();
                var difference_ms = date2_ms - date1_ms;
                var num_date = Math.round(difference_ms / one_day);
                return num_date;
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
