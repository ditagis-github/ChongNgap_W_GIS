namespace WebTNBDGIS.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public class HIENTRANG_TRAMBOM
    {
        public int OBJECTID { get; set; }

        [StringLength(50)]
        public string TenTram { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? CongSuat { get; set; }

        public short? TinhTrangTramBom { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? NgayCapNhat { get; set; }

        [StringLength(50)]
        public string NguoiCapNhat { get; set; }

        public short? DonViCapNhat { get; set; }

        public short? DonViQuanLy { get; set; }

        public byte[] HinhAnh { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? ToaDoX { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? ToaDoY { get; set; }

        [StringLength(20)]
        public string MaDoiTuong { get; set; }

        [StringLength(10)]
        public string MaPhuongXa { get; set; }

        [StringLength(10)]
        public string MaQuanHuyen { get; set; }

        public short? GiaiDoanQuyHoach { get; set; }

        [StringLength(250)]
        public string GhiChu { get; set; }
        
        
    }
}
