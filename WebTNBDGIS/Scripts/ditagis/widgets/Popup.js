define([
    "ditagis/widgets/BieuDoMua",
    "ditagis/widgets/BieuDoDanSo",
    "ditagis/widgets/BieuDoTrieu",
    "dojo/_base/array",
    "esri/tasks/query",
    "esri/geometry/Point",
    "esri/geometry/Extent",
    "esri/dijit/AttributeInspector",
    "dijit/form/Button",
    "dojo/_base/connect",
    "dojo/dom-construct",], function (BieuDoMua, BieuDoDanSo,BieuDoTrieu,
        array, Query, Point, Extent,
        AttributeInspector, Button, connect, domConstruct
    ) {

        "use strict";
        class Popup {
            constructor(map) {
                this.map = map;
                this.bieuDoMua = new BieuDoMua();
                this.bieuDoDanSo = new BieuDoDanSo();
                this.bieuDoTrieu = new BieuDoTrieu();
                this.selectFeature = null;

            }
            isFireField(fieldName) {
            }
            startup(evt) {
                var layers = array.map(evt.layers, function (result) {
                    return result.layer;
                });

                dojo.forEach(layers, (layer) => {
                    dojo.connect(layer, "onClick", (evt) => {
                        if (evt.graphic)
                            var objectId = evt.graphic.attributes["OBJECTID"];
                        var screenPoint = evt.screenPoint;
                        this.show(layer, objectId, screenPoint);


                    });

                });


            }
            show(layer, objectId, screenPoint) {
                var query = new Query();
                if (this.map.infoWindow.isShowing) {
                    this.map.infoWindow.hide();
                }
                var layerInfos = [{
                    'featureLayer': layer,
                    'isEditable': true,
                    'showDeleteButton': true,
                }];

                var attInspector = new esri.dijit.AttributeInspector({
                    layerInfos: layerInfos
                }, dojo.create("div"));

                if (objectId) {
                    query.objectIds = [objectId];
                } else {
                    return;
                }

                layer.on("selection-complete", (evt) => {
                    if (layer.id == 'TramDoMua' && layer.getSelectedFeatures()[0].attributes['MaTram'] == "TDM") {
                        $.ajax({
                            url: "http://luuluongmua.quantraconline.com/api/Values/GetData?user_id=3&station_id=2&page_num=1&page_size=1&interval=0.API",
                            success: (result) => {
                                if (result) {
                                    layer.getSelectedFeatures()[0].attributes['LuongMua'] = result.data[0].ValueDict.FLOW;
                                    attInspector.refresh();
                                }

                            }
                        });
                    }
                });
                layer.selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW, (features) => {
                    if (features.length > 0) {
                        this.selectFeature = features[0];
                        var extent = new Extent(this.selectFeature._extent);
                        var center = this.map.toScreen(extent.getCenter());
                        this.map.infoWindow.setTitle(layer.title);
                        this.map.infoWindow.setContent(attInspector.domNode);
                        this.map.infoWindow.resize(320, 420);
                        this.map.infoWindow.show(screenPoint || center);

                    } else {
                        this.map.infoWindow.hide();
                    }
                });

                //add a save button next to the delete button
                var saveButton = new Button({ label: "Lưu", "class": "saveButton" }, domConstruct.create("div"));
                var viewBieuDoButton = new Button({ label: "Biểu đồ", "class": "viewButton" }, domConstruct.create("div"));
                viewBieuDoButton.on("click", () => {
                    this.viewBieuDoButtonClickHandle();
                });
                domConstruct.place(saveButton.domNode, attInspector.deleteBtn.domNode, "after");
                if (layer.id == 'TramDoMua' || layer.id == "DanSo" || layer.id == "TramDoTrieu") {
                    domConstruct.place(viewBieuDoButton.domNode, saveButton.domNode, "after");
                    for (const fieldInfo of attInspector.layerInfos[0].fieldInfos) {
                        if (fieldInfo.fieldName == 'LuongMua') {
                            fieldInfo.field.editable = false;
                            attInspector.refresh();
                        }
                    }

                }


                saveButton.on("click", () => {
                    if (this.selectFeature.getLayer().id == 'TramDoMua') {
                        this.selectFeature.attributes['LuongMua'] = null;
                    }
                    this.selectFeature.getLayer().applyEdits(null, [this.selectFeature], null);
                    this.selectFeature.getLayer().refresh();
                });

                dojo.connect(attInspector, "onAttributeChange", (feature, fieldName, newFieldValue) => {
                    //store the updates to apply when the save button is clicked 
                    this.selectFeature.attributes[fieldName] = newFieldValue;
                });

                dojo.connect(attInspector, "onDelete", (feature) => {
                    feature.getLayer().applyEdits(null, null, [feature]);
                    this.map.infoWindow.hide();
                });
            }
            viewBieuDoButtonClickHandle() {
                console.log(this.selectFeature.getLayer().id);
                if (this.selectFeature.getLayer().id == 'TramDoMua') {
                    if(this.selectFeature.attributes['MaTram'] == "TDM"){
                        this.bieuDoMua.getLuongMuaQuanTrac(this.selectedLayer);
                    }
                    else this.bieuDoMua.show(this.selectFeature);
                    
                }
                if (this.selectFeature.getLayer().id == "DanSo") {
                    this.bieuDoDanSo.queryFeatureTable(this.selectFeature);
                }
                if (this.selectFeature.getLayer().id == "TramDoTrieu") {
                    this.bieuDoTrieu.show(this.selectFeature);
                }
            }
        }

        return Popup;
    });
