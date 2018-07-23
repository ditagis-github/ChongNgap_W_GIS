using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebTNBDGIS.Models;
using WebTNBDGIS.Models;

namespace WebTNBDGIS.Models
{
    public class EFGroupUserRepository : IGroupUserRepository
    {

        private GISDataContext context = new GISDataContext();
        public IQueryable<GroupUser> GroupUsers
        {
            get { return context.GroupUsers; }
        }

        public string saveGroupUser(GroupUser group)
        {
            if (group.id == 0)
            {
                context.GroupUsers.Add(group);
            }
            else
            {
                GroupUser dbEntry = context.GroupUsers.Find(group.id);
                if (dbEntry != null)
                {
                    dbEntry.name = group.name;
                    dbEntry.parent = group.parent;
                    dbEntry.status = group.status;
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

        public string deleteGroupUser(int id)
        {
            GroupUser group = context.GroupUsers.Find(id);
            string result = "";
            if (group != null)
            {
                try
                {
                    context.Database.BeginTransaction();

                    context.Database.ExecuteSqlCommand(" DELETE FROM GroupRole WHERE GroupID = " + id);

                    context.Database.ExecuteSqlCommand(" DELETE FROM Users WHERE id in ( select UserID from UserInGroup where GroupID = " + id + " )");

                    context.Database.ExecuteSqlCommand(" DELETE FROM UserInGroup WHERE GroupID= " + id);

                    context.GroupUsers.Remove(group);
                    context.SaveChanges();

                    context.Database.CurrentTransaction.Commit();

                }
                catch (Exception ex)
                {
                    result = ex.Message;
                    context.Database.CurrentTransaction.Rollback();
                }
            }
            return result;
        }
    }
}
