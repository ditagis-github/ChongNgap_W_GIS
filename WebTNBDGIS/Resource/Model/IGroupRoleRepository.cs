using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebTNBDGIS.Models;

namespace WebTNBDGIS.Models
{
    public interface IGroupRoleRepository
    {
        IQueryable<GroupRole> GroupRoles { get; }
        string saveGroupRole(GroupRole groupRole);
        string deleteGroupRole(int id);

    }
}
