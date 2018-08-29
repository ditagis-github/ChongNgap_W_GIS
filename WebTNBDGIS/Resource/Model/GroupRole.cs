using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebTNBDGIS.Models
{
    [Table("GroupRole")]
    public class GroupRole
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }//int identity(1,1) ,

        [Required(ErrorMessage = "Vui lòng chọn {0} ")]
        [Display(Name = "Nhóm người dùng")]
        public int GroupID { get; set; }
        
        [Display(Name = "Quản trị người dùng")]
        public Boolean? QuanTriNguoiDung { get; set; }

        [Display(Name = "Tìm kiếm thông tin")]
        public Boolean? TimKiem { get; set; }

        [Display(Name = "Thống kê thông tin")]
        public Boolean? ThongKe { get; set; }

        [Display(Name = "Xuất dữ liệu ra file Excel")]
        public Boolean? XuatExcel { get; set; }

        [Display(Name = "Xuất dữ liệu ra file hình")]
        public Boolean? XuatFileHinh { get; set; }

        [Display(Name = "Xem biểu đồ")]
        public Boolean? XuatBieuDo { get; set; }

        [Display(Name = "Báo cáo sự cố")]
        public Boolean? BaoCaoSuCo { get; set; }

        [Display(Name = "Thêm khu vực duy tu")]
        public Boolean? BaoCaoDuyTu { get; set; }

        [Display(Name = "Xem bản đồ trên Google Earth")]
        public Boolean? ViewKML { get; set; }

        [Display(Name = "Xem website liên kết")]
        public Boolean? ViewRelationLink { get; set; }

        [Display(Name = "Xem video")]
        public Boolean? ViewFile { get; set; }

        [Display(Name = "Thêm video")]
        public Boolean? AddFile { get; set; }
    }
}
