define([
    "esri/tasks/query",
    "esri/layers/FeatureLayer",
    "ditagis/widgets/Report"
], function (Query, FeatureLayer, Report) {

    return class {
        constructor(map) {
            this.map = map;
            this.report = new Report(this.map);
            this.searchLayer = null;
            this.displayFields = {
            }
            this.hanhChinhHuyenLayer = new FeatureLayer("http://112.78.4.175:6080/arcgis/rest/services/BaseMap_ChongNgapBD/MapServer/5",
                {
                    mode: FeatureLayer.MODE_ONEDEMAND,
                    outFields: ["*"],
                });

            this.hanhChinhXaLayer = new FeatureLayer("http://112.78.4.175:6080/arcgis/rest/services/BaseMap_ChongNgapBD/MapServer/4",
                {
                    mode: FeatureLayer.MODE_ONEDEMAND,
                    outFields: ["*"]
                });
            this.dsHuyen = [], this.dsXa = [];
           
            $(".searchData").click((evt) => {
                $(".panel-group").hide();
                $("#search-tool").show();
                var div = this.selectLayer_change(evt);
                $("#query-fields-widget").empty();
                $("#query-fields-widget").append(div);
            });
            this.initDisplaySearch();

        }
        selectLayer_change(evt) {
            $("#searchPanel_Content #searchPanel_Field_Content").remove();
            this.select_hanhchinhxa.find('option').remove().end().append(this.option_default).val('');
            let layerID = evt.target.id;
            var title = evt.target.text;
            $("#title-search").html(title);
            this.searchLayer = this.map.getLayer(layerID);
            if (this.searchLayer == null) return;
            let searchFields = this.searchLayer.searchFields;
            // let fields = this.searchLayer.fields;
            var attributeslayer = $("<div/>");
            if (this.searchLayer) {
                let ul = $('<ul/>', {
                    class: 'fieldList'
                }).appendTo(attributeslayer);
                let optionObservable = {};
                var fields = this.searchLayer.getQueryFields(this.displayFields[layerID]);
                for (const field of fields) {
                    if (field.type === 'esriFieldTypeOID')
                        continue;
                    if (field.name == "SHAPE" || field.name == "SHAPE.STArea()" || field.name == "SHAPE.STLength()")
                        continue;
                    optionObservable[field.name] = null;
                    let li, label, input;
                    li = $('<li/>').appendTo(ul);
                    label = $('<label/>', {
                        for: 'field' + field.name,
                        text: field.alias
                    }).appendTo(li);
                    input = $('<input/>', {
                        'data-bind': 'value:' + field.name,
                        name: field.name,
                        style: 'width:100%',
                        class: 'input-field'
                    }).appendTo(li);
                    input.keyup((evt) => {
                        if (evt.key === 'Enter') {
                            this.btnQueryClickHandler(this.searchLayer, observable)
                        }
                    });
                    if (field.name == 'MaQuanHuyen') {
                        input.kendoDropDownList({
                            optionLabel: "Chọn...",
                            dataTextField: "text",
                            dataValueField: "value",
                            dataSource: this.dsHuyen,
                            change: function (e) {
                                let maHuyenTP = this.value();
                                let inputXaPhuong = $(ul.find('input[name=MaPhuongXa]'));
                                if (inputXaPhuong) {
                                    inputXaPhuong.data('kendoDropDownList').select(0);
                                    inputXaPhuong.data('kendoDropDownList').dataSource.filter({
                                        field: "MaHuyenTP",
                                        operator: "eq",
                                        value: maHuyenTP
                                    })
                                }
                            }
                        });
                    }
                    else if (field.name == 'MaPhuongXa') {
                        input.kendoDropDownList({
                            optionLabel: "Chọn...",
                            dataTextField: "text",
                            dataValueField: "value",
                            dataSource: this.dsXa,
                        })
                        input.data("kendoDropDownList").dataSource.filter({
                            field: "MaHuyenTP",
                            operator: "eq",
                            value: "null"
                        })
                        input.data("kendoDropDownList").text("");
                    }
                    else if (field.domain && field.domain.type === "codedValue") {
                        const codedValues = field.domain.codedValues;
                        if (codedValues.length > 0) {
                            input.kendoDropDownList({
                                dataTextField: "name",
                                dataValueField: "code",
                                dataSource: codedValues,
                            });
                        }
                    } else if (field.type === 'date') {
                        input.kendoDatePicker();
                    } else {
                        input.addClass('k-textbox');
                        if (field.type === 'small-integer' ||
                            field.type === 'integer') {
                            input.attr('type', 'number');
                        }
                    }
                }
                let observable = kendo.observable(optionObservable);
                kendo.bind(ul, observable);
                let btnQuery = $('<button/>', {
                    class: 'k-button k-primary',
                    text: 'Truy vấn'
                }).appendTo($('<li/>').appendTo(ul));
                btnQuery.click(() => this.btnQueryClickHandler(this.searchLayer, observable));
            }
            return attributeslayer;
        }
        btnQueryClickHandler(layer, observable) {
            let where = [];
            const fields = this.searchLayer.fields;
            for (const field of fields) {
                if (field.type === 'esriFieldTypeOID')
                    continue;
                if (!observable[field.name])
                    continue;
                let value = null;
                if (field.name == 'MaQuanHuyen') {
                    value = observable[field.name]['value'];
                } else if (field.name == 'MaPhuongXa') {
                    value = observable[field.name]['value'];
                } else if (field.domain && field.domain.type === "codedValue") {
                    //tìm theo name
                    value = observable[field.name].code;
                } else
                    value = observable[field.name];
                if (value) {
                    if (field.type === 'esriFieldTypeString') {
                        where.push(`${field.name} like N'%${value}%'`);
                    } else
                        where.push(`${field.name} like ${value}`);
                }


            }
            if (where.length > 0) {
                let query = new Query();
                query.returnGeometry = false;
                query.where = where.join(' AND ');
                if (this.searchLayer.definitionExpression)
                    query.where = "(" + query.where + ") and " + this.searchLayer.definitionExpression;
                this.searchLayer.queryFeatures(query).then(results => {
                    var features = results.features;
                    if (features && features.length > 0) {
                        var attributes = [];
                        for (const feature of features) {
                            let attribute = feature.attributes;
                            attributes.push(attribute);
                        }
                        this.report.showTable(layer, attributes);
                    }

                    else {
                        kendo.alert('Không tìm thấy đối tượng nào');
                    }

                });
            } else {
            }
        }
        initDisplaySearch() {
            this.select_hanhchinhxa = $('<select/>', {
                id: "cbb_PhuongXa",
                class: "form-control"
            });
            this.getHanhChinhHuyen();
            this.getHanhChinhXa();
        }
        getHanhChinhHuyen() {
            var query = new Query();
            query.where = "1=1";
            this.hanhChinhHuyenLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW, (results) => {
                if (results.length > 0) {
                    for (var i = 0; i < results.length; i++) {
                        var feat = results[i];
                        var attr = feat.attributes;
                        var huyen = {
                            value: attr["MaHuyenTP"],
                            text: attr["TenHuyen"]
                        }
                        this.dsHuyen.push(huyen);

                    }
                }
            });

        }
        getHanhChinhXa() {
            var query = new Query();
            query.where = "1=1";
            this.hanhChinhXaLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW, (results) => {
                if (results.length > 0) {
                    for (var i = 0; i < results.length; i++) {
                        var feat = results[i];
                        var attr = feat.attributes;
                        var xa = {
                            value: attr["MaPhuongXa"],
                            text: attr["TenXa"],
                            MaHuyenTP: attr["MaHuyenTP"]
                        }
                        this.dsXa.push(xa);
                    }
                }
            });

        }
        async features(where) {
            var displayResults = await this.searchFeatures(where);
            var features = displayResults.features;
            var attributes_features = [];
            for (var i = 0; i < features.length; i++) {
                var feature = features[i];
                var attr = feature.attributes;
                attributes_features.push(attr);

            }
            this.report.showTable(this.searchLayer, attributes_features);
        }
        searchFeatures(where) {
            var query = new Query();
            query.outSpatialReference = this.map.spatialReference;
            query.where = where;
            return this.searchLayer.queryFeatures(query);
        }



    }
});