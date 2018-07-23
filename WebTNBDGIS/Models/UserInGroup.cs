using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebTNBDGIS.Models
{
    [Table("UserInGroup")]
    public class UserInGroup
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [Required(ErrorMessage = "Vui lòng chọn {0} ")]
        [Display(Name = "Tên người dùng")]
        public int UserID { get; set; }
        [ForeignKey("UserID")]
        [Display(Name = "Tên người dùng")]
        public Users Users { get; set; }

        [Display(Name = "Tên nhóm người dùng")]
        [Required(ErrorMessage = "Vui lòng chọn {0} ")]
        public int GroupID { get; set; }
        [Display(Name = "Tên nhóm người dùng")]
        [ForeignKey("GroupID")]
        public GroupUser GroupUser { get; set; }

    }
}
