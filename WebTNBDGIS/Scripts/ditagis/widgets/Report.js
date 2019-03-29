var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["../core/Base",
    "dojo/dom-construct",
    "esri/tasks/query",
    "esri/layers/FeatureLayer",
    "esri/geometry/Point", "esri/geometry/Extent",
],
    function (Base, domConstruct, Query, FeatureLayer,
        Point, Extent, ) {
        "use strict";
        class Report extends Base {
            constructor(map) {
                super();
                this.map = map;
                this.initWindowKendo();

            }
            initWindowKendo() {
                this.report_content = $('<div/>', {
                    id: "report-objects"
                }).appendTo(document.body);
                this.table = domConstruct.create('div', {
                    id: 'table-report'
                });
                this.report_content.append(this.table);
                this.report_content.kendoWindow({
                    title: "Title",
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
                }).data("kendoWindow");
            }
            convertAttributes(fields, lstAttributes) {
                var attributesList = [];
                if (fields && fields.length > 0 && lstAttributes.length > 0) {
                    for (let index = lstAttributes.length - 1; index >= 0; index--) {
                        var attributes = lstAttributes[index];
                        fields.forEach(field => {
                            let value = attributes[field.name];
                            if (value) {
                                if (field.type === "date") {
                                    attributes[field.name] = kendo.toString(new Date(attributes[field.name]), "HH:mm:ss dd-MM-yyyy");
                                }
                                else if (field.domain) {
                                    let codedValues = field.domain.codedValues;
                                    attributes[field.name] = this.getValueDomain(attributes[field.name], codedValues);
                                }
                            }
                        });
                        attributesList.push(attributes);
                    }
                }
                return attributesList;
            }
            getValueDomain(code, codedValues) {
                let valueDomain = null;
                codedValues.forEach(codedValue => {
                    if (codedValue["code"] == code)
                        valueDomain = codedValue["name"];
                });
                return valueDomain;
            }
            showTable(layer, attributes) {
                var displayFields = layer.displayFields;
                var fields = layer.fields;
                var columns = [];
                var export_columns = [];
                for (const field of layer.fields) {
                    if (field.name != "SHAPE" && field.name != "SHAPE.STArea()" && field.name != "SHAPE.STLength()")
                        export_columns.push({ title: field.alias, field: field.name });
                }
                if (displayFields) {
                    for (const displayField of displayFields) {
                        for (const field of layer.fields) {
                            if (displayField == field.name) {
                                columns.push({ title: field.alias, field: field.name });
                            }
                        }

                    }
                }
                else {
                    for (const field of layer.fields) {
                        if (field.name != "SHAPE" && field.name != "SHAPE.STArea()" && field.name != "SHAPE.STLength()")
                            columns.push({ title: field.alias, field: field.name });
                    }
                }
                let kendoAttributes = this.convertAttributes(fields, attributes);
                this.kendoGrid = $('#table-report').empty().kendoGrid({
                    toolbar: [{ name: "custom", text: "Xuất báo cáo" }],
                    resizable: true,
                    excel: {
                        allPages: true,
                        fileName: "Thống kê dữ liệu.xlsx"
                    },
                    selectable: true,
                    pageable: true,
                    columns: columns,
                    dataSource: {
                        transport: {
                            read: function (e) {
                                e.success(kendoAttributes);
                            },
                            error: function (e) {
                                alert("Status: " + e.status + "; Error message: " + e.errorThrown);
                            }
                        },
                        pageSize: 8,
                        batch: false,
                        schema: {
                            model: {
                                id: "OBJECTID",
                            }
                        }
                    },
                    change: (e) => {
                        let selectedRows = e.sender.select();
                        let objectID = e.sender.dataItem(selectedRows)['OBJECTID'];
                        if (layer.geometryType == "esriGeometryPoint") {
                            this.zoomRowPoint(objectID, layer);
                        }
                        else if (layer.geometryType == "esriGeometryPolygon") {
                            this.zoomRowPolygon(objectID, layer);
                        }
                        else if (layer.geometryType == "esriGeometryPolyline") {
                            this.zoomRowPolygon(objectID, layer);
                        }
                    },
                    excelExport: (e) => {
                        if (e.data) {
                            for (const item of e.data) {
                            }
                        }
                    }
                });
                var window = this.report_content.kendoWindow({
                }).data("kendoWindow").open();
                window.title(layer.title);
                this.kendoGrid.find(".k-grid-toolbar").on("click", ".k-grid-custom", (e) => {
                    this.exportExcel(kendoAttributes, export_columns);
                });
            }
            exportExcel(attributes, columns) {
                var cells = [];
                var hidden_columns = ["DoSau", "LuuLuong", "VanToc", "tenTuyen1", "tenTuyen2", "tenTuyen3"];
                var export_columns = [];
                for (const column of columns) {
                    let isHiddenColumn = false;
                    for (let hidden_column of hidden_columns) {
                        if (hidden_column == column.field)
                            isHiddenColumn = true;
                    }
                    if (!isHiddenColumn) {
                        export_columns.push(column);
                    }
                }
                for (const column of export_columns) {
                    var cell = {
                        value: column.title
                    }
                    cells.push(cell);
                }
                var rows = [{
                    cells: cells
                }];
                for (const attribute of attributes) {
                    let cells = [];
                    for (const column of export_columns) {
                        var cell = {
                            value: attribute[column.field]
                        }
                        cells.push(cell);
                    }
                    rows.push({
                        cells: cells
                    })
                }
                //using fetch, so we can process the data when the request is successfully completed
                var workbook = new kendo.ooxml.Workbook({
                    sheets: [
                        {
                            columns: [
                                // Column settings (width)
                                { autoWidth: true },
                                { autoWidth: true },
                            ],
                            rows: rows
                        }
                    ]
                });
                kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Thống kê dữ liệu.xlsx" });
            }
            zoomRowPoint(id, layerClass) {
                this.map.graphics.clear();
                layerClass.clearSelection();
                var query = new Query();
                query.objectIds = [id];
                layerClass.selectFeatures(query, FeatureLayer.SELECTION_NEW, (features) => {
                    if (features.length > 0) {
                        var point = features[0].geometry;
                        if (point) {
                            var pt = new Point(point.x, point.y, this.map.spatialReference);
                            if (pt) {
                                var extent = new Extent((point.x + 10), (point.y + 10), (point.x - 10), (point.y - 10), this.map.spatialReference);
                                layerClass.selectFeatures(features[0]);
                                var stateExtent = extent.expand(5.0);
                                this.map.setExtent(stateExtent);
                            }
                        }
                    }

                });
            }

            zoomRowPolygon(id, layerClass) {
                layerClass.clearSelection();
                this.map.graphics.clear();
                var query = new Query();
                query.objectIds = [id];
                layerClass.selectFeatures(query, FeatureLayer.SELECTION_NEW, (features) => {
                    //zoom to the selected feature
                    layerClass.selectFeatures[features[0]];
                    var stateExtent = features[0].geometry.getExtent().expand(10);
                    this.map.setExtent(stateExtent);
                });
            }
        }
        return Report;
    });
