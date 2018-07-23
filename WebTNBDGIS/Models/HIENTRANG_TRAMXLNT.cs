namespace WebTNBDGIS.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public class HIENTRANG_TRAMXLNT
    {
        public int OBJECTID { get; set; }

        [StringLength(100)]
        public string TenNhaMay { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? CongSuatXuLy { get; set; }

        public short? DonViQuanLy { get; set; }

        [StringLength(250)]
        public string PhamViXuLy { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? DienTich { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? NgayCapNhat { get; set; }

        [StringLength(50)]
        public string NguoiCapNhat { get; set; }

        public short? DonViCapNhat { get; set; }

        [StringLength(250)]
        public string GhiChu { get; set; }

        [StringLength(20)]
        public string MaDoiTuong { get; set; }

        [StringLength(10)]
        public string MaPhuongXa { get; set; }

        [StringLength(10)]
        public string MaQuanHuyen { get; set; }

        public short? GiaiDoanQuyHoach { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? CongSuatDuKien { get; set; }
        
        
    }
}
