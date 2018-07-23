
    using System;
namespace WebTNBDGIS.Models
{
    public class HIENTRANG_BECHUA
    {
        public int OBJECTID { get; set; }
        
        public string TenBeChua { get; set; }
        
        public decimal? DienTich { get; set; }
        
        public decimal? CongSuat { get; set; }

        public short? DonViQuanLy { get; set; }
        
        public DateTime? NgayCapNhat { get; set; }
        
        public string NguoiCapNhat { get; set; }

        public short? DonViCapNhat { get; set; }
        
        public string GhiChu { get; set; }
        
        public string MaDoiTuong { get; set; }
        
        public string MaPhuongXa { get; set; }
        
        public string MaQuanHuyen { get; set; }

        public short? GiaiDoanQuyHoach { get; set; }
        
        public decimal? ToaDoX { get; set; }
        
        public decimal? ToaDoY { get; set; }
        
    }
}
