
define([
    "ditagis/configs",
    "dojo/dom", "dojo/on",
    "esri/tasks/query", "esri/tasks/QueryTask",
    "dojo/dom-construct",
],
    function (configs, dom, on, Query, QueryTask,
        domConstruct) {
        class BieuDoMua {
            constructor() {
                this.initWindow();
                this.initDataSourceKendo();
                this.initTypeSelection();
                this.initChart();
                this.initQueryTask();
            }
            initQueryTask() {
                var url = configs.tables["Mua"].url;
                this.queryTask = new QueryTask(url);
                this.query = new Query();
                this.query.returnGeometry = false;
                this.query.outFields = ["*"];
            }
            show(selectFeature) {
                this.select_input.select(-1);
                $(".date-frame").hide();
                $("#content").hide();
                $("#select-type-query").show();
                this.chart_window.data("kendoWindow").open();
                this.selectFeature = selectFeature;
            }
            queryFeatureTable_Month(month, year) {
                let dk1 = "MaTram = '" + this.selectFeature.attributes["MaTram"] + "'";
                let dk2 = "Nam = " + year;
                var where = dk1 + " and " + dk2;
                this.query.where = where;
                this.queryTask.execute(this.query, (results) => {
                    var features = results.features;
                    if (features.length > 0) {
                        var datas = features.map(m => ({ Time: m.attributes.Ngay, Value: m.attributes['Thang' + month] }))
                        this.showChart(datas);
                    }

                });
            }

            queryFeatureTable_Months(month_start, month_end, year) {
                let dk1 = "MaTram = '" + this.selectFeature.attributes["MaTram"] + "'";
                let dk2 = "Nam = " + year;
                this.query.where = dk1 + " and " + dk2;
                this.queryTask.execute(this.query, (results) => {
                    var features = results.features;
                    if (features.length > 0) {
                        var datas = [];
                        for (var thang = month_start; thang <= month_end; thang++) {
                            var rs = features.map(m => (parseFloat(m.attributes['Thang' + thang]) | 0));
                            let sum = rs.reduce((a, b) => a + b, 0);
                            let data = {
                                Time: "Tháng " + thang,
                                Value: sum
                            }
                            datas.push(data);
                        }
                        this.showChart(datas);
                    }

                });
            }
            queryFeatureTable_Years(yStart, yEnd) {
                let dk1 = "MaTram = '" + this.selectFeature.attributes["MaTram"] + "'";
                let dk2 = "Nam >= " + yStart + " and Nam <= " + yEnd;
                this.query.where = dk1 + " and " + dk2;
                this.queryTask.execute(this.query, (results) => {
                    var features = results.features;
                    if (features.length > 0) {
                        var datas = [];
                        for (var nam = yStart; nam <= yEnd; nam++) {
                            let fs = features.filter(m => m.attributes["Nam"] == nam);
                            let sumNam = [];
                            for (var thang = 1; thang <= 12; thang++) {
                                var rs = fs.map(m => (parseFloat(m.attributes['Thang' + thang]) | 0));
                                let sum = rs.reduce((a, b) => a + b, 0);
                                sumNam.push(sum);
                            }
                            let data = {
                                Time: "Năm " + nam,
                                Value: sumNam.reduce((a, b) => a + b, 0)
                            }
                            datas.push(data);

                        }
                        this.showChart(datas);
                    }

                });
            }
            showChart(dataSource) {
                $("#content").show();
                $("#content").kendoChart({
                    legend: {
                        position: "bottom",
                    },
                    "dataSource": {
                        data: dataSource,
                    },
                    series: [{
                        field: "Value",
                        type: "column",
                        categoryField: "Time",
                        labels: {
                            visible: false
                        },
                    }],
                    seriesColors: ['#1a237e', '#ff8d00', '#5cc461'],
                    tooltip: {
                        visible: true
                    }
                });
            }
            initWindow() {
                this.chart_window = $('<div/>', {
                    id: "chart-content"
                }).appendTo(document.body);
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
            initDataSourceKendo() {
                this.data_months = [];
                this.data_years = [];
                for (var i = 1; i <= 12; i++) {
                    this.data_months.push({ text: i, value: i });
                }
                for (var i = 1980; i <= 2030; i++) {
                    this.data_years.push({ text: i, value: i });
                }
            }
            initTypeSelection() {
                var selectTypeQuery = [
                    {
                        type: "select_of_month",
                        text: "Lượng mưa theo ngày"
                    },
                    {
                        type: "select_of_months",
                        text: "Tổng lượng mưa tháng"
                    },
                    {
                        type: "select_of_years",
                        text: "Tổng lượng mưa năm"
                    }
                ]
                var group = $('<div/>', {
                    id: "select-type-query",
                }).appendTo(this.chart_window);
                var input = $('<input/>', {
                    class: 'input-field',
                    style: 'width:50%',
                }).appendTo(group);
                input.kendoDropDownList({
                    optionLabel: "Chọn...",
                    dataTextField: "text",
                    dataValueField: "type",
                    dataSource: selectTypeQuery,
                    change: (e) => {
                        let type = e.sender._old;
                        $(".date-frame").hide();
                        if (type == "select_of_month") {
                            $("#select_of_month_group").show();
                        }
                        else if (type == 'select_of_months') {
                            $("#select_of_months_group").show();
                        }
                        else $("#select_of_year_group").show();
                    }
                });
                this.select_input = input.data("kendoDropDownList");
                this.initSelectOfMonth();
                this.initSelectOfMonths();
                this.initSelectOfYears();
                $(".date-frame").hide();
            }
            initSelectOfYears() {
                var group = $('<div/>', {
                    id: "select_of_year_group",
                    class: 'date-frame'
                }).appendTo(this.chart_window);
                var year_start = this.getInputYear(group);
                year_start.data("kendoDropDownList").setOptions({
                    optionLabel: "Từ năm",
                });
                var year_end = this.getInputYear(group);
                year_end.data("kendoDropDownList").setOptions({
                    optionLabel: "Đến năm",
                });
                var btnView = this.getBtnView(group);
                btnView.kendoButton({
                    click: () => {
                        let yStartValue = year_start.val();
                        let yEndValue = year_end.val();
                        if (!yStartValue || !yEndValue) {
                            kendo.alert("Vui lòng nhập đẩy đủ thông tin");
                        }
                        this.queryFeatureTable_Years(parseInt(yStartValue), parseInt(yEndValue));
                    }
                });

            }
            initSelectOfMonths() {
                var group = $('<div/>', {
                    id: "select_of_months_group",
                    class: 'date-frame'
                }).appendTo(this.chart_window);
                var month_start = this.getInputMonth(group);
                month_start.data("kendoDropDownList").setOptions({
                    optionLabel: "Từ tháng",
                });
                var month_end = this.getInputMonth(group);
                month_end.data("kendoDropDownList").setOptions({
                    optionLabel: "Đến tháng",
                });
                var year = this.getInputYear(group);
                var btnView = this.getBtnView(group);
                btnView.kendoButton({
                    click: () => {
                        let mstart = month_start.val() || 1;
                        let mend = month_end.val() || 12;
                        let yearValue = year.val();
                        if (!yearValue) {
                            kendo.alert("Vui lòng nhập đẩy đủ thông tin");
                        }
                        else
                            this.queryFeatureTable_Months(parseInt(mstart), parseInt(mend), parseInt(yearValue));
                    }
                });
            }
            initSelectOfMonth() {
                var group = $('<div/>', {
                    id: "select_of_month_group",
                    class: 'date-frame'
                }).appendTo(this.chart_window);
                var month = this.getInputMonth(group);
                var year = this.getInputYear(group);
                var btnView = this.getBtnView(group);
                btnView.kendoButton({
                    click: () => {
                        let monthValue = month.val();
                        let yearValue = year.val();
                        if (!monthValue || !yearValue) {
                            kendo.alert("Vui lòng nhập đẩy đủ thông tin");
                        }
                        else
                            this.queryFeatureTable_Month(parseInt(monthValue), parseInt(yearValue));
                    }
                });
            }
            getBtnView(group) {
                let btnView = $('<button/>', {
                    text: "Xem biểu đồ",
                    class: 'k-primary'
                }).appendTo(group);
                // create DropDownList from input HTML element
                btnView.kendoButton();
                return btnView;
            }
            getInputMonth(group) {
                let month = $('<input/>', {
                    class: "input-control"
                }).appendTo(group);
                month.kendoDropDownList({
                    optionLabel: "Chọn tháng",
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: this.data_months,
                });
                return month;
            }
            getInputYear(group) {
                let year = $('<input/>', {
                    class: "input-control"
                }).appendTo(group);
                year.kendoDropDownList({
                    optionLabel: "Chọn năm",
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: this.data_years,
                });
                return year;
            }
            initChart() {
                var group = $('<div/>', {
                    id: "luong-mua-quan-trac",
                    class: 'date-frame'
                }).appendTo(this.chart_window);
                $('<span/>', {
                    text: "Từ",
                    class: "span-label",
                }).appendTo(group);
                $('<input/>', {
                    id: "start"
                }).appendTo(group);
                $('<span/>', {
                    text: "Đến",
                    class: "span-label",
                }).appendTo(group);
                $('<input/>', {
                    id: "end"
                }).appendTo(group);
                var btnView = this.getBtnView(group);

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
                btnView.kendoButton({
                    click: () => {
                        var start_date = this.startDatePicker.value();
                        var end_date = this.end_datePicker.value();
                        this.getLuongMuaQuanTrac(start_date, end_date);

                    }
                });
                var group = $('<div/>', {
                    id: "content",
                }).appendTo(this.chart_window);
            }
            getLuongMuaQuanTrac(start_date, end_date) {
                $(".date-frame").hide();
                $("#content").show();
                $("#luong-mua-quan-trac").show();
                $("#select-type-query").hide();
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
                var url = `http://luuluongmua.quantraconline.com/api/Values/GetData?user_id=3&station_id=4&page_num=1&page_size=10000&interval=${this.interval}&start_time=${startTime}&end_time=${endTime}`;
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
                                else {
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
                                // valueAxis: { min: 800, max: 1200 },
                                series: [{
                                    field: "FLOW",
                                    type: "column",
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
                                    if (axis.categories)
                                        axis.categories = axis.categories.sort();
                                },
                                seriesColors: ['#b71c1c', '#1a237e', '#ff8d00', '#5cc461'],
                                tooltip: {
                                    visible: true
                                }
                            });
                        }

                    },
                    error: function () {
                        $("#content").hide();
                        kendo.alert("Lỗi không phản hồi dữ liệu")
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
