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
            $("#btSearch").click((evt) => {
                $("#result_SearchData_Content").html("");
                var cbb_DVQuanLy = $("#cbb_DVQuanLy").val();
                var cbb_QuanHuyen = $("#cbb_QuanHuyen").val();
                var cbb_PhuongXa = $("#cbb_PhuongXa").val();
                $("#loading").removeClass("undisplay");
                $("#loading").removeClass("undisplay");
                $(".loading-label").addClass("display");
                let where = '1=1';
                if (cbb_DVQuanLy && cbb_DVQuanLy != '') {
                    where += ` and DonViQuanLy = ${cbb_DVQuanLy}`;
                }
                if (cbb_QuanHuyen && cbb_QuanHuyen != '') {
                    where += ` and MaQuanHuyen = ${cbb_QuanHuyen}`;
                }
                if (cbb_PhuongXa && cbb_PhuongXa != '') {
                    where += ` and MaPhuongXa = ${cbb_PhuongXa}`;
                }
                this.features(where);
            });
            $(".searchData").click((evt) => {
                $("#searchPanel_Content #searchPanel_Field_Content").remove();
                this.select_hanhchinhxa.find('option').remove().end().append(this.option_default).val('');
                let layerID = evt.target.title;
                var title = evt.target.text;
                $("#titleSearchHeader").html("Tìm kiếm " + title);
                this.searchLayer = map.getLayer(layerID);
                if (this.searchLayer == null) return;
                let searchFields = this.searchLayer.searchFields;
                let fields = this.searchLayer.fields;
                for (const searchField of searchFields) {
                    for (const field of fields) {
                        if (searchField == field.name) {
                            let searchField_Content = $("<div/>", {
                                id: "searchPanel_Field_Content",
                                class: "SearchPanel_Content"
                            });
                            $("#searchPanel_Content").append(searchField_Content);
                            let label_Field = $("<label>").text(field.alias);
                            searchField_Content.append(label_Field);
                            if (field.domain) {
                                let domainData = field.domain;
                                let valueDomain = domainData.codedValues;
                                let select = $('<select/>', {
                                    id: "cbb_DVQuanLy",
                                    class: "form-control"
                                });
                                searchField_Content.append(select);
                                let option = $('<option/>');
                                option.attr({ 'value': '' }).text('Chọn...');
                                select.append(option);
                                for (var x = 0; x < valueDomain.length; x++) {
                                    let option = $('<option/>');
                                    option.attr({ 'value': valueDomain[x].code }).text(valueDomain[x].name);
                                    select.append(option);
                                }
                            }
                            if (field.name == 'MaQuanHuyen') {
                                let select = $('<select/>', {
                                    id: "cbb_QuanHuyen",
                                    class: "form-control"
                                });
                                for (const huyen of this.dsHuyen) {
                                    let option = $('<option/>');
                                    option.attr({ 'value': huyen.value }).text(huyen.text);
                                    select.append(option);
                                }
                                select.change((evt) => {
                                    this.select_hanhchinhxa.find('option').remove().end().append(this.option_default).val('');
                                    var dID = evt.currentTarget.value;
                                    console.log(dID);
                                    for (const xa of this.dsXa) {
                                        if (dID == xa.MaHuyenTP || xa.MaHuyenTP == "default") {
                                            let option = $('<option/>');
                                            option.attr({ 'value': xa.value }).text(xa.text);
                                            this.select_hanhchinhxa.append(option);
                                        }
                                    }

                                });
                                searchField_Content.append(select);
                            }
                            if (field.name == 'MaPhuongXa') {
                                searchField_Content.append(this.select_hanhchinhxa);
                            }
                            break;
                        }
                    }
                }
                $(".left_panel").slideUp();
                $("#SearchPanel").slideDown();
            });
            this.initDisplaySearch();

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
            var option_default = {
                value: '',
                text: "Chọn..."
            }
            this.dsHuyen.push(option_default);
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
            var option_default = {
                value: '',
                text: "Chọn...",
                MaHuyenTP: "default"
            }
            this.dsXa.push(option_default);
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