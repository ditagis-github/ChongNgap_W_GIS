define(["require", "exports"], function (require, exports) {
    "use strict";
    return {
        basemap: {
            title: 'Dữ liệu nền Bình Dương',
            id: 'dulieunen',
            url: 'http://112.78.4.175:6080/arcgis/rest/services/BaseMap_ChongNgapBD/MapServer',
            copyright: 'Bản đồ biên tập bởi Trung tâm DITAGIS',
            sublayers: [{
                id: 5,
                title: 'Hành chính huyện'
            },
            {
                id: 4,
                title: 'Hành chính xã'
            }, {
                id: 3,
                title: 'Phủ bề mặt',
                visible: false
            },
            {
                id: 2,
                title: 'Mặt giao thông',
                visible: false
            }, {
                id: 1,
                title: 'Sông hồ'
            }, {
                id: 0,
                title: 'Tim đường'
            }
            ]
        },
        layers: {
            LuuVucThoatNuoc: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/9",
                id: "LuuVucThoatNuoc",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
            },
            KhuVucNgap: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/7",
                id: "KhuVucNgap",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
            },
            TramBom: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/0",
                id: "TramBom",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
            },
            TramXLNT: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/8",
                id: "TramXLNT",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
            },
            BeChua: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/5",
                id: "BeChua",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
            },
            CongThoatNuoc: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/6",
                id: "CongThoatNuoc",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
            },
            
            MoiNoiCong: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/1",
                id: "MoiNoiCong",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
            },
            MiengXa: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/2",
                id: "MiengXa",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
            },
            HoGa: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/3",
                id: "HoGa",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
            },
            Gieng: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/4",
                id: "Gieng",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
            },
            
            
            
            
        },
        // zoom: 10,
        // center: [106.6843694, 11.158752270428375]
    };
});
