using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebTNBDGIS.Models;

namespace WebTNBDGIS.Models
{
    public  class UserAccess
    {
        private  EFUsersRepository usersRepository = new EFUsersRepository();

        public userInfor getInfor(string username)
        {
            userInfor result;
            result = usersRepository.getInfor(username);
            return result;
        }


        public Boolean canAccessData(string username, string tableData)
        {
            Boolean check = false;
            check = usersRepository.canAccessData(username, tableData);
            return check;
        }

        //public  Boolean canViewData(string username, string tableData)
        //{
        //    Boolean check = false;
        //    check = usersRepository.canViewData(username, tableData);
        //    return check;
        //}

        //public  Boolean canInsertData(string username, string tableData)
        //{
        //    Boolean check = false;
        //    check = usersRepository.canInsertData(username, tableData);
        //    return check;
        //}

        //public  Boolean canDeleteData(string username, string tableData)
        //{
        //    Boolean check = false;
        //    check = usersRepository.canDeleteData(username, tableData);
        //    return check;
        //}

        //public  Boolean canUpdateData(string username, string tableData)
        //{
        //    Boolean check = false;
        //    check = usersRepository.canUpdateData(username, tableData);
        //    return check;
        //}

    }

    

}