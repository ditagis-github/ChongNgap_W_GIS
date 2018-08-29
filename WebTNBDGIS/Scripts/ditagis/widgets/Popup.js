define([
    "ditagis/widgets/BieuDoMua",
    "dojo/_base/array",
    "esri/tasks/query",
    "esri/geometry/Point",
    "esri/geometry/Extent",
    "esri/dijit/AttributeInspector",
    "dijit/form/Button",
    "dojo/_base/connect",
    "dojo/dom-construct",], function (BieuDoMua,
        array, Query, Point, Extent,
        AttributeInspector, Button, connect, domConstruct
    ) {

        "use strict";
        class Popup {
            constructor(map) {
                this.map = map;
                this.bieuDoMua = new BieuDoMua();
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

                var featUpdate;

                layer.on("selection-complete", (evt) => {
                    if (layer.id == 'TramDoMua') {
                        $.ajax({
                            url: "http://luuluongmua.quantraconline.com/api/Values/GetData?user_id=3&station_id=2&page_num=1&page_size=1&interval=0.API",
                            success: function (result) {
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
                        featUpdate = features[0];
                        var extent = new Extent(featUpdate._extent);
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

                domConstruct.place(saveButton.domNode, attInspector.deleteBtn.domNode, "after");
                if (layer.id == 'TramDoMua') {
                    for (const fieldInfo of attInspector.layerInfos[0].fieldInfos) {
                        if (fieldInfo.fieldName == 'LuongMua') {
                            fieldInfo.field.editable = false;
                            attInspector.refresh();
                        }
                    }
                    var viewButton = new Button({ label: "Biểu đồ", "class": "viewButton" }, domConstruct.create("div"));
                    domConstruct.place(viewButton.domNode, saveButton.domNode, "after");
                    viewButton.on("click", () => {
                        this.bieuDoMua.startup();
                    });
                }


                saveButton.on("click", function () {
                    if (featUpdate.getLayer().id == 'TramDoMua') {
                        featUpdate.attributes['LuongMua'] = null;
                    }
                    featUpdate.getLayer().applyEdits(null, [featUpdate], null);
                    featUpdate.getLayer().refresh();
                });

                dojo.connect(attInspector, "onAttributeChange", function (feature, fieldName, newFieldValue) {
                    //store the updates to apply when the save button is clicked 
                    featUpdate.attributes[fieldName] = newFieldValue;
                });

                dojo.connect(attInspector, "onDelete", function (feature) {
                    feature.getLayer().applyEdits(null, null, [feature]);
                    this.map.infoWindow.hide();
                });
            }


        }

        return Popup;
    });
