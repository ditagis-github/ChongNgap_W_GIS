namespace WebTNBDGIS.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public class HIENTRANG_HOGA
    {
        public int OBJECTID { get; set; }

        public int? DuongKinh { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? ToaDoX { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? ToaDoY { get; set; }

        public short? LoaiHoGa { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? LuuLuong { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? VanToc { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? DoSau { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? ChieuCao { get; set; }

        public short? VatLieu { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? NgayCapNhat { get; set; }

        [StringLength(50)]
        public string NguoiCapNhat { get; set; }

        public short? DonViQuanLy { get; set; }

        public short? DonViCapNhat { get; set; }

        public byte[] HinhAnh { get; set; }

        [StringLength(250)]
        public string GhiChu { get; set; }

        [StringLength(20)]
        public string MaDoiTuong { get; set; }

        [StringLength(10)]
        public string MaPhuongXa { get; set; }

        [StringLength(10)]
        public string MaQuanHuyen { get; set; }

        public short? GiaiDoanQuyhoach { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? CaoDoTKDinhCong { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? CaoDoTKTuNhien { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? CaoDoTKDayCong { get; set; }
        
        [StringLength(50)]
        public string TenHoGa { get; set; }
        
    }
}
