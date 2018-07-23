using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebTNBDGIS.Models;
using WebTNBDGIS.Models;

namespace WebTNBDGIS.Models
{
    public class EFUserInGroupRepository : IUserInGroupRepository
    {
        private GISDataContext context = new GISDataContext();

        public IQueryable<UserInGroup> UserInGroups
        {
            get { return context.UserInGroups; }
        }
        public string saveUserInGroup(UserInGroup userInGroup)
        {
            if (userInGroup.id == 0)
            {
                context.UserInGroups.Add(userInGroup);
            }
            else
            {
                UserInGroup dbEntry = context.UserInGroups.Find(userInGroup.id);
                if (dbEntry != null)
                {
                    dbEntry.GroupID = userInGroup.GroupID;
                }
            }
            try
            {
                context.SaveChanges();
                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string deleteUserInGroup(int id)
        {
            UserInGroup userGroup = context.UserInGroups.Find(id);
            string result = "";
            if (userGroup != null)
            {
                try
                {
                    context.UserInGroups.Remove(userGroup);
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    result = ex.Message;
                }
            }
            return result;
        }
    }
}
