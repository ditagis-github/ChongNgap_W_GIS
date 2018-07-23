using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebTNBDGIS.Models;

namespace WebTNBDGIS.Models
{
    public interface IUserInGroupRepository
    {
        IQueryable<UserInGroup> UserInGroups { get; }
        string saveUserInGroup(UserInGroup userInGroup);
        string deleteUserInGroup(int id);
    }
}
