
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
                var url = configs.tables["Trieu"].url;
                this.queryTask = new QueryTask(url);
                this.query = new Query();
                this.query.returnGeometry = false;
                this.query.outFields = ["*"];
            }
            show(selectFeature) {
                this.select_input.select(-1);
                $(".date-frame").hide();
                $("#content_bieudotrieu").hide();
                this.chart_window.data("kendoWindow").open();
                this.selectFeature = selectFeature;
            }
            queryFeatureTable_Month(month, year) {
                let dk1 = "MaTram = '" + this.selectFeature.attributes["MaDoiTuong"] + "'";
                let dk2 = "Nam = " + year;
                let dk3 = "Thang = " + month;
                var where = dk1 + " and " + dk2 + " and " + dk3;
                this.query.where = where;
                this.queryTask.execute(this.query, (results) => {
                    var features = results.features;
                    if (features.length > 0) {
                        var datas = [];
                        for (const feature of features) {
                            let values = [];
                            for (var i = 0; i < 23; i++) {
                                values.push(feature.attributes['F' + i + 'gio']);
                            }
                            let data = {
                                Time: feature.attributes.Ngay,
                                MaxValue: Math.max.apply(null, values),
                                MinValue: Math.min.apply(null, values)
                            }
                            datas.push(data);
                        }
                        this.showChart(datas);
                    }

                });
            }

            queryFeatureTable_Months(month_start, month_end, year) {

                let dk1 = "MaTram = '" + this.selectFeature.attributes["MaDoiTuong"] + "'";
                let dk2 = "Nam = " + year;
                let dk3 = "Thang >= " + month_start + " and Thang <= " + month_end;
                var where = dk1 + " and " + dk2 + " and " + dk3;
                this.query.where = where;
                this.queryTask.execute(this.query, (results) => {
                    var features = results.features;
                    if (features.length > 0) {
                        var datas = [];
                        for (var thang = month_start; thang <= month_end; thang++) {
                            let fs = features.filter(m => m.attributes["Thang"] == thang);
                            let values = [];
                            for (const feature of fs) {
                                for (var i = 0; i < 23; i++) {
                                    values.push(feature.attributes['F' + i + 'gio']);
                                }
                            }
                            let data = {
                                Time: "Tháng " + thang,
                                MaxValue: Math.max.apply(null, values),
                                MinValue: Math.min.apply(null, values)
                            }
                            datas.push(data);
                            this.showChart(datas);
                        }
                        this.showChart(datas);
                    }

                });
            }
            showChart(dataSource) {
                $("#content_bieudotrieu").show();
                $("#content_bieudotrieu").kendoChart({
                    legend: {
                        position: "bottom",
                    },
                    "dataSource": {
                        data: dataSource,
                    },
                    series: [{
                        field: "MaxValue",
                        type: "line",
                        categoryField: "Time",
                        name: 'max',
                        labels: {
                            visible: false
                        },
                    }, {
                        field: "MinValue",
                        type: "line",
                        name: 'min',
                        labels: {
                            visible: false
                        },
                        categoryField: "Time",
                    }],
                    seriesColors: ['#b71c1c', '#1a237e', '#ff8d00', '#5cc461'],
                    tooltip: {
                        visible: true
                    }
                });
            }
            initWindow() {
                this.chart_window = $('<div/>', {
                    id: "chart-content_bieudotrieu"
                }).appendTo(document.body);
                this.chart_window.kendoWindow({
                    width: 900,
                    title: "Biểu đồ mực nước",
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
                for (var i = 2010; i <= 2030; i++) {
                    this.data_years.push({ text: i, value: i });
                }
            }
            initTypeSelection() {
                var selectTypeQuery = [
                    {
                        type: "min-max-month",
                        text: "Mực nước min-max tháng"
                    },
                    {
                        type: "min-max-year",
                        text: "Mực nước min-max năm"
                    }
                ]
                var group = $('<div/>', {
                }).appendTo(this.chart_window);
                var input = $('<input/>', {
                    class: 'input-field',
                    id: "select-type-query",
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
                        if (type == "min-max-month") {
                            $("#min_max_month_group").show();
                        }
                        else if (type == 'min-max-year') {
                            $("#min_max_months_group").show();
                        }
                    }
                });
                this.select_input = input.data("kendoDropDownList");
                this.initSelectOfMonth();
                this.initSelectOfMonths();
                $(".date-frame").hide();
            }
            initSelectOfMonths() {
                var group = $('<div/>', {
                    id: "min_max_months_group",
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
                        let mstart = month_start.val() | 1;
                        let mend = month_end.val() | 12;
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
                    id: "min_max_month_group",
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
                $('<div/>', {
                    id: "content_bieudotrieu",
                }).appendTo(this.chart_window);
            }

        };
        return BieuDoMua;
    });
