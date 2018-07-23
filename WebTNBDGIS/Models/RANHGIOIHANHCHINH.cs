namespace WebTNBDGIS.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    
    public class RANHGIOIHANHCHINH
    {
        public int OBJECTID { get; set; }

        [StringLength(255)]
        public string MaNhanDang { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? Shape_Leng { get; set; }

        [StringLength(10)]
        public string MaPhuongXa { get; set; }

        [StringLength(10)]
        public string MaHuyenTP { get; set; }

        [StringLength(255)]
        public string GhiChu { get; set; }

        public short? DonViQuanLy { get; set; }

        public short? DonViCapNhat { get; set; }

        [StringLength(50)]
        public string MaDoiTuong { get; set; }

        [StringLength(255)]
        public string MaDonViHanhChinh { get; set; }

        [StringLength(50)]
        public string DanhTuChung { get; set; }

        [StringLength(50)]
        public string DiaDanh { get; set; }

        [StringLength(50)]
        public string DoiTuong { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? NgayThuNhan { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? NgayCapNhat { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? DienTich { get; set; }

        [StringLength(100)]
        public string TenXa { get; set; }

        [StringLength(100)]
        public string TenHuyen { get; set; }
        
        
    }
}
