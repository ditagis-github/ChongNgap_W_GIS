define(["require", "exports"], function (require, exports) {
    "use strict";
    return {
        basemap: {
            title: 'Dữ liệu nền Bình Dương',
            id: 'dulieunen',
            url: 'https://ditagis.com:6443/arcgis/rest/services/BD_ChongNgap/BaseMap/MapServer',
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
        },layers: {
           TramDoMua:{
                url:"https://ditagis.com:6443/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/0",
                id:"TramDoMua",
                searchFields:["OBJECTID"],
                title:"Trạm đo mưa"
            },TramBom:{
                url:"https://ditagis.com:6443/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/1",
                id:"TramBom",
                searchFields:[],
                title:""
            },MuaVeTinh:{
                url:"https://ditagis.com:6443/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/2",
                id:"MuaVeTinh",
                searchFields:[],
                title:""
            },HoGa:{
                url:"https://ditagis.com:6443/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/3",
                id:"HoGa",
                searchFields:[],
                title:""
            },CuaXa:{
                url:"https://ditagis.com:6443/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/4",
                id:"CuaXa",
                searchFields:[],
                title:""
            },TuyenDuongNgap:{
                url:"https://ditagis.com:6443/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/5",
                id:"TuyenDuongNgap",
                searchFields:[],
                title:""
            },VungNgap:{
                url:"https://ditagis.com:6443/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/6",
                id:"VungNgap",
                searchFields:[],
                title:""
            },TramXLNT:{
                url:"https://ditagis.com:6443/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/7",
                id:"",
                searchFields:[],
                title:""
            },Muong:{
                url:"https://ditagis.com:6443/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/8",
                id:"",
                searchFields:[],
                title:""
            },LuuVucThoatNuoc:{
                url:"https://ditagis.com:6443/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/9",
                id:"",
                searchFields:[],
                title:""
            },KhuVucMua:{
                url:"https://ditagis.com:6443/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/10",
                id:"",
                searchFields:[],
                title:""
            },Kenh:{
                url:"https://ditagis.com:6443/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/11",
                id:"",
                searchFields:[],
                title:""
            },HoChua:{
                url:"https://ditagis.com:6443/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/12",
                id:"",
                searchFields:[],
                title:""
            },TramDoTrieu:{
                url:"https://ditagis.com:6443/arcgis/rest/services/BD_ChongNgap/ChuyenDe/FeatureServer/13",
                id:"",
                searchFields:[],
                title:""
            }
        },
        layers1: {
            LuuVucThoatNuoc: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/9",
                id: "LuuVucThoatNuoc",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
                title:"Lưu vực thoát nước"
            },
            KhuVucNgap: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/7",
                id: "KhuVucNgap",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
                title:"Khu vực ngập"
            },
            TramBom: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/0",
                id: "TramBom",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
                title:"Trạm bơm"
            },
            TramXLNT: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/8",
                id: "TramXLNT",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
                title: "Trạm xử lý nước thải"
            },
            BeChua: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/5",
                id: "BeChua",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
                title:"Bể chứa"
            },
            CongThoatNuoc: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/6",
                id: "CongThoatNuoc",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
                title:"Cống thoát nước"
            },
            
            MoiNoiCong: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/1",
                id: "MoiNoiCong",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
                title:"Mối nối cống"
            },
            MiengXa: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/2",
                id: "MiengXa",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
                title:"Miệng xả"
            },
            HoGa: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/3",
                id: "HoGa",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
                title:"Hố ga"
            },
            Gieng: {
                url: "http://112.78.4.175:6080/arcgis/rest/services/ChuyenDe_ChongNgapBD/MapServer/4",
                id: "Gieng",
                searchFields:["DonViQuanLy","MaQuanHuyen","MaPhuongXa"],
                title:"Giếng"
            },
            
            
            
            
        },
        // zoom: 10,
        // center: [106.6843694, 11.158752270428375]
    };
});
