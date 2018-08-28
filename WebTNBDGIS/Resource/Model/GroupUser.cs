using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebTNBDGIS.Models
{
    [Table("GroupUser")]
    public class GroupUser
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [StringLength(100, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Tên nhóm")]
        public string name { get; set; }

        [Display(Name = "Tên loại cha")]
        public int? parent { get; set; }

        [ForeignKey("parent")]
        [Display(Name = "Tên loại cha")]
        public GroupUser GroupUserParent { get; set; }

        [Display(Name = "Trạng thái")]
        public Boolean status { get; set; }


    }
}
