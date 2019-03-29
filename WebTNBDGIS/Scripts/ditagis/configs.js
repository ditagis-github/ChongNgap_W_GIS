define(["require", "exports"], function (require, exports) {
    "use strict";
    return {
        basemap: {
            title: 'Dữ liệu nền Bình Dương',
            id: 'dulieunen',
            url: 'https://ditagis.com/arcgis/rest/services/BD_ChongNgap/BaseMap/MapServer',
            copyright: 'Bản đồ biên tập bởi Trung tâm DITAGIS',
            sublayers: [{
                id: 6,
                title: 'Hành chính huyện'
            },
            {
                id: 5,
                title: 'Hành chính xã'
            }, {
                id: 4,
                title: 'Tim đường',
            }, {
                id: 3,
                title: 'Tim sông',
            },
            {
                id: 2,
                title: 'Sông hồ',
            }, {
                id: 1,
                title: 'Giao thông',
            }, {
                id: 0,
                title: 'Thửa đất'
            }
            ]
        },
        kmls: {
            BaseMap: {
                title: 'Dữ liệu nền',
                id: 'dulieunen',
                url: 'https://ditagis.com/arcgis/rest/services/BD_ChongNgap/BaseMap/MapServer/kml/mapImage.kmz',
            },
            ChuyenDe: {
                title: 'Dữ liệu chuyên đề',
                id: 'dulieuchuyende',
                url: 'https://ditagis.com/arcgis/rest/services/BD_ChongNgap/ChuyenDe/MapServer/kml/mapImage.kmz',
            }
        },
        layers: {
            DanSo: {
                url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/QuanLy/FeatureServer/0",
                id: "DanSo",
                searchFields: ["OBJECTID"],
                displayFields:["OBJECTID","TenHuyen","MaHuyenTP","ORIG_FID"],
                title: "Dân số"
            },
            TramDoMua: {
                url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/1",
                id: "TramDoMua",
                searchFields: ["OBJECTID"],
                displayFields:["OBJECTID","TenTram","ViTriHanhChinh","MaPhuongXa","MaQuanHuyen","KinhDo","ViDo","GhiChu"],
                title: "Trạm đo mưa"
            }, TramBom: {
                url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/2",
                id: "TramBom",
                searchFields: [],
                displayFields:["OBJECTID","TenTram","CongSuat","ToaDoX","ToaDoY","MaPhuongXa","MaQuanHuyen"],
                title: "Trạm bơm"
            }, HoGa: {
                url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/4",
                id: "HoGa",
                searchFields: [],
                displayFields:["OBJECTID","MaDoiTuong","ToaDoX","ToaDoY","MaPhuongXa","MaQuanHuyen"],
                title: "Hố ga"
            }, CuaXa: {
                url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/5",
                id: "CuaXa",
                searchFields: [],
                displayFields:["OBJECTID","MaDoiTuong","ToaDoX","ToaDoY","MaPhuongXa","MaQuanHuyen"],
                title: "Cửa xả"
            }, BeChua: {
                url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/6",
                id: "BeChua",
                searchFields: [],
                displayFields:["OBJECTID","TenBeChua","DienTich","CongSuat","MaPhuongXa","MaQuanHuyen"],
                title: "Bể chứa"
            }, CongThoatNuoc: {
                url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/8",
                id: "CongThoatNuoc",
                searchFields: [],
                displayFields:["OBJECTID","MaDoiTuong","ChieuDai","VatLieu","DoDoc","LoaiCongThoatNuoc","ten","ChieuDai","MaPhuongXa","MaQuanHuyen"],
                title: "Cống thoát nước"
            }, TramXLNT: {
                url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/10",
                id: "TramXLNT",
                searchFields: [],
                displayFields:["OBJECTID","TenNhaMay","DienTich","GiaiDoanQuyHoach","MaPhuongXa","MaQuanHuyen"],
                title: "Trạm XLNT"
            }, Muong: {
                url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/11",
                id: "Muong",
                searchFields: [],
                displayFields:["OBJECTID","maDoiTuong","ngayThuNhan","loaiTrangThaiNuocMat","danhTuChung","ChieuDai"],
                title: "Mương"
            }, LuuVucThoatNuoc: {
                url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/12",
                id: "LuuVucThoatNuoc",
                searchFields: [],
                displayFields:["OBJECTID","MaDoiTuong","TenLuuVuc","NgayCapNhat","DienTich","MaPhuongXa","MaQuanHuyen"],
                title: "Lưu vực thoát nước"
            }, KhuVucMua: {
                url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/13",
                id: "KhuVucMua",
                searchFields: [],
                title: "Khu vực mưa"
            }, Kenh: {
                url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/14",
                id: "Kenh",
                searchFields: [],
                title: ""
            }, HoChua: {
                url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/15",
                id: "HoChua",
                searchFields: [],
                displayFields:["OBJECTID","maNhanDang","ngayThuNhan","maDoiTuong","MaPhuongXa","MaQuanHuyen"],
                title: "Hồ chứa"
            }, TramDoTrieu: {
                url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/0",
                id: "TramDoTrieu",
                searchFields: [],
                displayFields:["OBJECTID","MaDoiTuong","TenTram","ViTri","Song","Tinh"],
                title: "Trạm đo triều"
            }
        },
        tables: {
            DanSo: {
                url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/QuanLy/FeatureServer/1",
                id: "DB_DanSo",
            },
            Mua: {
                url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/QuanLy/FeatureServer/2",
                id: "DB_Mua",
            },
            Trieu: {
                url: "https://ditagis.com/arcgis/rest/services/BD_ChongNgap/QuanLy/FeatureServer/3",
                id: "DB_Trieu",
            }
        },
        // zoom: 10,
        // center: [106.6843694, 11.158752270428375]
    };
});
