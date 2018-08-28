using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebTNBDGIS.Models;

namespace WebTNBDGIS.Models
{
    public interface IGroupUserRepository
    {
        IQueryable<GroupUser> GroupUsers { get; }
        string saveGroupUser(GroupUser groupUser);
        string deleteGroupUser(int id);
    }
}
