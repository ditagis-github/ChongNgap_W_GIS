using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebTNBDGIS.Areas.Admin.Models
{
    public class AdminAccount
    {
        [StringLength(100, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Tên đăng nhập")]
        public string username { get; set; }

        [StringLength(1000, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Mật khẩu")]
        [DataType(DataType.Password)]
        public string pass { get; set; }

        [Display(Name = "Lưu mật khẩu ")]
        public Boolean isRemember { get; set; }
    }
}