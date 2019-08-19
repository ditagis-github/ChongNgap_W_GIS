define(["dojo/on", "dojo/dom-construct",
    "../support/HightlightGraphic",
    "../editing/Editing",
    "./PopupEditing",
    "../toolview/Bootstrap",
    "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol", "esri/Color",
    "esri/core/watchUtils"],
    function (on, domConstruct,
        HightlightGraphic, Editing, PopupEditing, bootstrap,
        SimpleMarkerSymbol, SimpleFillSymbol, SimpleLineSymbol, Color,
        watchUtils) {
        "use strict";
        class Popup {
            constructor(view) {
                this.view = view;
                this.options = {
                    hightLength: 100
                };
                this.hightlightGraphic = new HightlightGraphic(view, {
                    symbolMarker: new SimpleMarkerSymbol({
                        outline: new SimpleLineSymbol({
                            color: new Color('#7EABCD'),
                            width: 2
                        })
                    }),
                    symbolFill: new SimpleFillSymbol({
                        outline: new SimpleLineSymbol({
                            color: new Color('#7EABCD'),
                            width: 2
                        })
                    })
                });
                this.editing = new Editing(this.view);
                this.fireFields = ['NgayCapNhat', 'NguoiCapNhat', 'MaPhuongXa', 'MaHuyenTP', 'MaDoiTuong'];
                this.popupEditing = new PopupEditing(view, {
                    hightLength: this.options.hightLength,
                });
            }
            startup() {
                this.view.map.layers.forEach((layer) => {
                    if (layer.type === 'feature') {
                        let actions = [];
               
                        let permission = layer.permission;
                        if (permission.edit) {
                            actions.push({
                                id: "update",
                                title: "Cập nhật",
                                className: "esri-icon-edit",
                                layer: layer
                            });
                            actions.push({
                                id: "update-geometry",
                                title: "Cập nhật vị trí",
                                className: "esri-icon-locate",
                                layer: layer
                            });
                        }
                        if (permission.delete)
                            actions.push({
                                id: "delete",
                                title: "Xóa",
                                className: "esri-icon-erase",
                                layer: layer
                            });
                        layer.popupTemplate = {
                            content: (target) => {
                                let content = this.contentPopup(target, layer);
                                return content;
                            },
                            title: layer.title,
                            actions: actions
                        };
                    }
                });
                this.view.popup.watch('visible', (newValue) => {
                    if (!newValue)
                        this.hightlightGraphic.clear();
                });
                this.view.popup.on("trigger-action", (evt) => {
                    this.triggerActionHandler(evt);
                });
                this.view.popup.dockOptions = {
                    buttonEnabled: true,
                    breakpoint: {
                        width: 600,
                        height: 1000
                    },
                    position: 'bottom-center'
                };
                this.view.popup.actionsMenuEnabled = false;
            }
            get selectFeature() {
                return this.view.popup.viewModel.selectedFeature;
            }
            get layer() {
                return this.selectFeature.layer;
            }
            get attributes() {
                return this.selectFeature.attributes;
            }
            get objectId() {
                return this.attributes['OBJECTID'];
            }
            triggerActionHandler(event) {
                let actionId = event.action.id;
                let layer = this.layer || event.action.layer;
                let fail = false;
                switch (actionId) {
                    case "update":
                        if (layer.permission && layer.permission.edit) {
                            if (event.action.className === 'esri-icon-check-mark') {
                                this.popupEditing.editFeature();
                            }
                            else {
                                this.popupEditing.showEdit();
                            }
                        }
                        else {
                            fail = true;
                        }
                        break;
                    case "delete":
                        if (layer.permission && layer.permission.delete) {
                            this.popupEditing.deleteFeature();
                        }
                        else {
                            fail = true;
                        }
                        break;
                    case "update-geometry":
                        this.view.popup.close();
                        this.popupEditing.updateGeometryGPS();
                        break;
                    default:
                        break;
                }
                if (fail) {
                    $.notify({
                        message: 'Không có quyền thực hiện tác vụ'
                    }, {
                            type: 'danger'
                        });
                }
            }
            editFeature() {
                let notify = $.notify({
                    title: `<strong>Cập nhật <i>${this.layer.title}</i></strong>`,
                    message: 'Cập nhật...'
                }, {
                        showProgressbar: true,
                        delay: 20000,
                        placement: {
                            from: 'top',
                            align: 'left'
                        }
                    });
                try {
                    if (this.attributes) {
                        for (let field of this.layer.fields) {
                            const type = field.type, name = field.name;
                            if (type === 'date') {
                                let date = this.attributes[name];
                                if (date && !Number.isInteger(date)) {
                                    let splitDate = date.split('-');
                                    if (splitDate.length === 3) {
                                        let day = splitDate[2], month = splitDate[1], year = splitDate[0];
                                        var dayString = new Date(`${month}/${day}/${year}`);
                                        const timestamp = dayString.getTime();
                                        this.attributes[name] = timestamp;
                                    }
                                    else {
                                        throw 'Không thể lấy dữ liệu thời gian';
                                    }
                                }
                            }
                        }
                        const updatedInfo = this.editing.getUpdatedInfo(this.view);
                        for (let i in updatedInfo) {
                            this.attributes[i] = updatedInfo[i];
                        }
                        this.layer.applyEdits({
                            updateFeatures: [{
                                attributes: this.attributes
                            }]
                        }).then((res) => {
                            let valid = false;
                            for (let item of res.updateFeatureResults) {
                                if (item.error) {
                                    valid = true;
                                    break;
                                }
                            }
                            if (!valid) {
                                notify.update('type', 'success');
                                notify.update('message', 'Cập nhật thành công!');
                                notify.update('progress', 90);
                                let query = this.layer.createQuery();
                                query.outFields = ['*'];
                                query.where = 'OBJECTID=' + this.attributes['OBJECTID'];
                                this.layer.queryFeatures(query).then(res => {
                                    this.view.popup.open({
                                        features: res.features
                                    });
                                });
                            }
                        });
                    }
                }
                catch (error) {
                    notify.update('type', 'danger');
                    notify.update('message', 'Có lỗi xảy ra trong quá trình cập nhật!');
                    notify.update('progress', 90);
                    throw error;
                }
            }
            getCodedValuesDomain(domain, name) {
                let codedValues;
                if (domain.type === "inherited") {
                    let fieldDomain = this.layer.getFieldDomain(name);
                    if (fieldDomain)
                        codedValues = fieldDomain.codedValues;
                }
                else {
                    codedValues = domain.codedValues;
                }
                return codedValues;
            }
            contentPopup(target, featureLayer) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const graphic = target.graphic, layer = graphic.layer || featureLayer, attributes = graphic.attributes;
                        if (!graphic.layer)
                            graphic.layer = layer;
                        this.hightlightGraphic.clear();
                        this.hightlightGraphic.add(graphic);
                        let div = domConstruct.create('div', {
                            class: 'popup-content',
                            id: 'popup-content'
                        }), table = domConstruct.create('table', {}, div);
                        for (let field of layer.fields) {
                            let value = attributes[field.name];
                            if (field.type === 'oid')
                                continue;
                            let row = domConstruct.create('tr');
                            let tdName = domConstruct.create('td', {
                                innerHTML: field.alias
                            }), content, formatString;
                            let codedValues;
                            if (field.domain) {
                                codedValues = this.getCodedValuesDomain(field.domain, field.name);
                            }
                            if (codedValues) {
                                let codeValue = codedValues.find(f => {
                                    return f.code === value;
                                });
                                if (codeValue)
                                    value = codeValue.name;
                            }
                            else if ((field.name === 'MaPhuongXa' || field.name === 'MaHuyenTP') && attributes[field.name]) {
                                let location = yield this.editing.getLocationName(this.view, {
                                    PhuongXa: attributes['MaPhuongXa'],
                                    HuyenTP: attributes['MaHuyenTP']
                                }).then((res) => __awaiter(this, void 0, void 0, function* () {
                                    return yield res;
                                }));
                                value = field.name === 'MaPhuongXa' ? location['TenPhuong'] : location['TenHuyen'];
                            }
                            else {
                                if (field.type === "small-integer" ||
                                    (field.type === "integer") ||
                                    (field.type === "double")) {
                                    //sdfjsv
                                }
                                else if (field.type === 'date') {
                                    formatString = 'DateFormat';
                                }
                            }
                            if (formatString) {
                                content = `{${field.name}:${formatString}}`;
                            }
                            else {
                                content = value;
                            }
                            let tdValue = domConstruct.create('td');
                            var txtArea = null;
                            if (field.length >= this.options.hightLength) {
                                txtArea = domConstruct.create('textarea', {
                                    rows: 5,
                                    cols: 25,
                                    readonly: true,
                                    innerHTML: content,
                                    style: 'background: transparent;border:none'
                                }, tdValue);
                            }
                            else {
                                tdValue.innerHTML = content;
                            }
                            domConstruct.place(tdName, row);
                            domConstruct.place(tdValue, row);
                            domConstruct.place(row, table);
                        }

                        if (layer.capabilities.data.supportsAttachment) {
                       
                            layer.queryAttachments({ objectIds: [attributes['OBJECTID']] }).then(res => {
                                console.log(res);
                                let attachments = res[attributes['OBJECTID']];
                                if (attachments.length > 0) {
                               
                                    let div = domConstruct.create('div', {
                                        class: 'attachment-container'
                                    }, document.getElementById('popup-content'));
                                    domConstruct.create('legend', {
                                        innerHTML: 'Hình ảnh'
                                    }, div);
                                    let url = `${layer.url}/${layer.layerId}/${attributes['OBJECTID']}`;
                                    for (let item of attachments) {
                                        let itemDiv = domConstruct.create('div', {
                                            class: 'col-lg-3 col-md-4 col-xs-6 thumb'
                                        }, div);
                                        let itemA = domConstruct.create('a', {
                                            class: "thumbnail",
                                            target:"_blank",
                                            href: `${url}/attachments/${item.id}`
                                        }, itemDiv);
                                        let img = domConstruct.create('img', {
                                            class: 'img-responsive',
                                            id: `${url}/attachments/${item.id}`,
                                            src: `${url}/attachments/${item.id}`,
                                            alt: `${url}/attachments/${item.name}`,
                                        }, itemA);
                 
                                    }
                                }

                            });
                        }
                        return div.outerHTML;
                    }
                    catch (err) {
                        throw err;
                    }
                });
            }
        }
        return Popup;
    });
