namespace WebTNBDGIS.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public class HIENTRANG_KHUVUCNGAP
    {
        public int OBJECTID { get; set; }

        [StringLength(50)]
        public string MaDoiTuong { get; set; }

        [StringLength(50)]
        public string TenKhuVuc { get; set; }

        [StringLength(50)]
        public string DienTich { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? NgayCapNhat { get; set; }

        [StringLength(50)]
        public string NguoiCapNhat { get; set; }

        public short? DonViCapNhat { get; set; }

        public short? DonViQuanLy { get; set; }

        [StringLength(250)]
        public string GhiChu { get; set; }
        
        [StringLength(10)]
        public string MaPhuongXa { get; set; }

        [StringLength(10)]
        public string MaQuanHuyen { get; set; }

        public short? GiaiDoanQuyHoach { get; set; }
        
    }
}
