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
                id: "LuuVucThoatNuoc"
            },
            KhuVucNgap: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/7",
                id: "KhuVucNgap"
            },
            TramBom: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/0",
                id: "TramBom"
            },
            TramXLNT: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/8",
                id: "TramXLNT"
            },
            BeChua: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/5",
                id: "BeChua"
            },
            CongThoatNuoc: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/6",
                id: "CongThoatNuoc"
            },
            
            MoiNoiCongTN: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/1",
                id: "MoiNoiCongTN"
            },
            MiengXa: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/2",
                id: "MiengXa"
            },
            HoGa: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/3",
                id: "HoGa"
            },
            Gieng: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/4",
                id: "Gieng"
            },
            
            
            
            
        },
        // zoom: 10,
        // center: [106.6843694, 11.158752270428375]
    };
});
