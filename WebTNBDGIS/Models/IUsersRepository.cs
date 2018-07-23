using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebTNBDGIS.Models;

namespace WebTNBDGIS.Models
{
    public interface IUsersRepository
    {
        IQueryable<Users> Users { get; }
        string saveUser(Users user);
        string changePass(Users user);
        string changeInforUser(ChangeInforUser user);
        string deleteUser(int id);

        ///for user
        ///
        Boolean isValid(string username, string password);
        userInfor getInfor(string username);
        Boolean canAccessData(string username, string tableData);
        //Boolean canViewData(string username, string tableData);
        //Boolean canInsertData(string username, string tableData);
        //Boolean canDeleteData(string username, string tableData);
        //Boolean canUpdateData(string username, string tableData);

    }
}
