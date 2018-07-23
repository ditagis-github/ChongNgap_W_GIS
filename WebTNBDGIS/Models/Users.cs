using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace WebTNBDGIS.Models
{
    [Table("Users")]
    public class Users
    {

        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [StringLength(100, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Tên đăng nhập")]
        public string username { get; set; }

        [StringLength(250, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Tên hiển thị")]
        public string NameDisplay { get; set; }

        [StringLength(1000, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Mật khẩu")]
        [DataType(DataType.Password)]
        public string pass { get; set; }

        [StringLength(1000, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập mật khẩu lần nữa")]
        [Display(Name = "Nhập lại mật khẩu")]
        [DataType(DataType.Password)]
        [System.Web.Mvc.Compare("pass", ErrorMessage = "Hai mật khẩu không giống nhau")]
        public string c_pass { get; set; }

        [StringLength(500, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Email")]
        public string email { get; set; }

        [Display(Name = "Avartar")]
        public string Avartar { get; set; }

        [Display(Name = "Đã kích hoạt")]
        public Boolean active { get; set; }

        [Display(Name = "Trạng thái")]
        public Boolean Status { get; set; }

        [Display(Name = "Mã kích hoạt")]
        public string active_code { get; set; }

        [Display(Name = "Ngày tạo tài khoản")]
        public DateTime DateCreate { get; set; }

    }

    public class userInfor
    {
        public int id { get; set; }
        public string username { get; set; }
        public string NameDisplay { get; set; }
        public string email { get; set; }
        public string Avartar { get; set; }
        public Boolean active { get; set; }
        public Boolean userSatus { get; set; }
        public DateTime DateCreate { get; set; }
        public int? GroupID { get; set; }
        public string groupName { get; set; }
        public int? groupParent { get; set; }
        public Boolean? GroupStatus { get; set; }
    }

    public class ChangePassUser
    {

        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [StringLength(100, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Tên đăng nhập")]
        public string username { get; set; }

        [StringLength(1000, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Mật khẩu cũ")]
        [DataType(DataType.Password)]
        public string oldpass { get; set; }

        [StringLength(1000, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Mật khẩu mới")]
        [DataType(DataType.Password)]
        public string pass { get; set; }

        [StringLength(1000, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập mật khẩu lần nữa")]
        [Display(Name = "Nhập lại mật khẩu mới")]
        [DataType(DataType.Password)]
        [System.Web.Mvc.Compare("pass", ErrorMessage = "Hai mật khẩu không giống nhau")]
        public string c_pass { get; set; }

    }

    public class ChangeInforUser
    {

        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [StringLength(100, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Tên đăng nhập")]
        public string username { get; set; }

        [StringLength(250, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Tên hiển thị")]
        public string NameDisplay { get; set; }

        [StringLength(500, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Email")]
        public string email { get; set; }

        [Display(Name = "Avartar")]
        public string Avartar { get; set; }


    }
}
