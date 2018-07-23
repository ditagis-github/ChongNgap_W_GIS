namespace WebTNBDGIS.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public class HIENTRANG_CONGTHOATNUOC
    {
        public int OBJECTID { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? ChieuDai { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? DoDoc { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? DoSau { get; set; }

        public short? VatLieu { get; set; }

        public short? LoaiCongThoatNuoc { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? NgayCapNhat { get; set; }

        [StringLength(50)]
        public string NguoiCapNhat { get; set; }

        public short? DonViCapNhat { get; set; }

        public short? DonViQuanLy { get; set; }

        public short? GiaiDoanQuyHoach { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? LuuLuong { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? VanToc { get; set; }

        public int? DuongKinh { get; set; }

        [StringLength(20)]
        public string MaDoiTuong { get; set; }

        [StringLength(10)]
        public string MaPhuongXa { get; set; }

        [StringLength(10)]
        public string MaQuanHuyen { get; set; }

        [StringLength(250)]
        public string GhiChu { get; set; }
        
    }
}
