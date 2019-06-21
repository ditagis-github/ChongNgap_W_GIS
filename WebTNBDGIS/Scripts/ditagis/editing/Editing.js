define(["esri/tasks/QueryTask"], function (QueryTask) {
    "use strict";
    class Editing {
        constructor(view) {
            if (view) {
                this.view = view;
            }
        }
        get layer() {
            return this._layer;
        }
        set layer(value) {
            this._layer = value;
        }
        getQueryLocation(view) {
            if (!this._queryLocation) {
                this._queryLocation = new QueryTask({
                    url: view.map.findLayerById("BASEMAP").findSublayerById(5).url
                });
            }
            return this._queryLocation;
        }
        getLocationName(view, params = { PhuongXa: null, HuyenTP: null }) {
            return new Promise((resolve, reject) => {
                try {
                    let queryLocation = this.getQueryLocation(view);
                    let where = [];
                    if (params.PhuongXa)
                        where.push(`MaPhuongXa = '${params.PhuongXa}'`);
                    if (params.HuyenTP)
                        where.push(`MaQuanHuyen = '${params.HuyenTP}'`);
                    queryLocation.execute({
                        outFields: ['TenXa', 'TenHuyen'],
                        where: where.join(' and ')
                    }).then(res => {
                        if (res && res.features.length > 0) {
                            let ft = res.features[0];
                            if (ft && ft.attributes) {
                                resolve(ft.attributes);
                            }
                        }
                        else {
                            resolve(null);
                        }
                    });
                }
                catch (error) {
                    reject(error);
                }
            });
        }
        getCreatedInfo() {
            return {
                // NguoiCapNhat: "userName",
                NgayCapNhat: new Date().getTime(),
            };
        }
        getUpdatedInfo() {
            return {
                // NguoiCapNhat: "userName",
                NgayCapNhat: new Date().getTime(),
            };
        }
        getLocationInfo(view, geometry) {
            return new Promise((resolve, reject) => {
                try {
                    let queryLocation = this.getQueryLocation(view);
                    queryLocation.execute({
                        outFields: ['MaPhuongXa', 'MaQuanHuyen'],
                        geometry: geometry
                    }).then(res => {
                        if (res && res.features.length > 0) {
                            let ft = res.features[0];
                            if (ft && ft.attributes) {
                                resolve(ft.attributes);
                            }
                        }
                        else {
                            resolve(null);
                        }
                    });
                }
                catch (error) {
                    reject(error);
                }
            });
        }
        draw(layer, graphic) {
            return __awaiter(this, void 0, void 0, function* () {
                var notify = $.notify({
                    title: '<strong>Cập nhật đối tượng</strong>',
                    message: 'Đang cập nhật...'
                }, {
                        showProgressbar: true,
                        delay: 20000
                    });
                let attributes = {};
                if (layer.drawingAttributes) {
                    for (let i in layer.drawingAttributes) {
                        attributes[i] = layer.drawingAttributes[i];
                    }
                }
                notify.update('type', 'info');
                notify.update('message', 'Đang lấy thông tin người cập nhật...');
                notify.update('progress', 10);
                
                const createdInfo = yield this.getCreatedInfo(this.view);
                for (let i in createdInfo) {
                    attributes[i] = createdInfo[i];
                }
                notify.update('type', 'info');
                notify.update('message', 'Lấy thông tin người cập nhật thành công');
                notify.update('progress', 20);
                notify.update('type', 'info');
                notify.update('message', 'Đang lấy vị trí...!');
                notify.update('progress', 30);
                let locationInfo = yield this.getLocationInfo(this.view, graphic.geometry);
                if (!locationInfo) {
                    notify.update('type', 'danger');
                    notify.update('message', 'Không xác định được vị trí');
                    notify.update('progress', 90);
                    return;
                }
                else {
                    notify.update('type', 'info');
                    notify.update('message', 'Lấy vị trí thành công!');
                    notify.update('progress', 80);
                    for (let i in locationInfo) {
                        attributes[i] = locationInfo[i];
                    }
                    graphic.attributes = attributes;
                    let edits = {
                        addFeatures: [graphic]
                    };
                    layer.applyEdits(edits).then((result) => __awaiter(this, void 0, void 0, function* () {
                        if (result.addFeatureResults.length > 0) {
                            for (let item of result.addFeatureResults) {
                                let attributes = { objectId: item.objectId };
                                layer.applyEdits({
                                    updateFeatures: [{
                                        attributes: attributes
                                    }]
                                }).then((result) => {
                                    if (!result.updateFeatureResults[0].error) {
                                        Promise.resolve();
                                        notify.update('type', 'success');
                                        notify.update('message', 'Cập nhật vị trí thành công!');
                                        notify.update('progress', 100);
                                        layer.queryFeatures({
                                            returnGeometry: true,
                                            spatialReference: this.view.spatialReference,
                                            where: 'OBJECTID = ' + item.objectId,
                                            outFields: ['*']
                                        }).then(res => {
                                            if (res.features[0]) {
                                                let ft = res.features[0];
                                            }
                                        });
                                    }
                                    else {
                                        notify.update('type', 'danger');
                                        Promise.reject("err");
                                    }
                                });
                            }
                        }
                    }));
                }
            });
        }
    }
    return Editing;
});
