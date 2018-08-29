using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebTNBDGIS.Models;
using WebTNBDGIS.Resource.Model;

namespace WebTNBDGIS.Models
{
    public class EFUsersRepository : IUsersRepository
    {
        private DBContextRainfall context = new DBContextRainfall();

        public IQueryable<Users> Users
        {
            get { return context.Users; }
        }

        public string saveUser(Users user)
        {
            if (user.id == 0)
            {
                context.Users.Add(user);
            }
            else
            {
                Users dbEntry = context.Users.Where(u => u.id == user.id && u.username == user.username).FirstOrDefault();
                if (dbEntry != null)
                {
                    dbEntry.email = user.email;
                    dbEntry.active = user.active;
                    dbEntry.NameDisplay = user.NameDisplay;
                    dbEntry.Avartar = user.Avartar;
                    dbEntry.Status = user.Status;
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

        public string changePass(Users user)
        {
            Users dbEntry = context.Users.Where(u => u.id == user.id && u.username == user.username).FirstOrDefault();
            if (dbEntry != null)
            {
                dbEntry.pass = user.pass;
                dbEntry.c_pass = user.pass;
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

        public string changeInforUser(ChangeInforUser user)
        {
            Users dbEntry = context.Users.Where(u => u.id == user.id && u.username == user.username).FirstOrDefault();
            if (dbEntry != null)
            {
                dbEntry.email = user.email;
                dbEntry.NameDisplay = user.NameDisplay;
                dbEntry.Avartar = user.Avartar;
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

        public string deleteUser(int id)
        {
            Users dbEntry = context.Users.Find(id);
            string result = "";
            if (dbEntry != null)
            {
                try
                {

                    context.Database.BeginTransaction();

                    context.Database.ExecuteSqlCommand(" DELETE FROM UserInGroup WHERE UserID= " + id);

                    context.Users.Remove(dbEntry);
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

        public userInfor getInfor(string username)
        {
            userInfor userResult = null;
            string query = "";
            query += " select u.id,u.username,u.NameDisplay,u.Avartar,u.DateCreate,u.Status as 'userSatus', ";
            query += " u.active,u.email,uInGroup.GroupID , groupUser.name as 'groupName',groupUser.parent  as 'groupParent',groupUser.status as 'GroupStatus' ";
            query += " from Users u ";
            query += " left join UserInGroup uInGroup ";
            query += " on u.id = uInGroup.UserID ";
            query += " left join GroupUser groupUser ";
            query += " on uInGroup.GroupID =  groupUser.id ";
            query += " where u.username = N'" + username + "'";

            userResult = context.Database.SqlQuery<userInfor>(query).FirstOrDefault();
            return userResult;

        }


        public Boolean canAccessData(string username, string tableData)
        {
            Boolean check = false;
            string query = "";
            query += " select gr."+ tableData + "  ";
            query += " from Users u ";
            query += " left join UserInGroup ug ";
            query += " on ug.UserID = u.id ";
            query += " left join GroupRole gr ";
            query += " on ug.GroupID = gr.GroupID ";
            query += " where u.username = N'" + username +"'";// +"' and gr." + tableData + " = " + checkPermission;
            try
            {
                check = context.Database.SqlQuery<Boolean>(query).FirstOrDefault();
            }
            catch { }
            return check;
        }


        //public Boolean canViewData(string username, string tableData)
        //{
        //    Boolean check = false;
        //    string query = "";
        //    query += " select gr.ViewData ";
        //    query += " from Users u ";
        //    query += " left join UserInGroup ug ";
        //    query += " on ug.UserID = u.id ";
        //    query += " left join GroupRole gr ";
        //    query += " on ug.GroupID = gr.GroupID ";
        //    query += " where u.username = N'" + username + "' and gr.TableData = N'" + tableData + "' ";

        //    check = context.Database.SqlQuery<Boolean>(query).FirstOrDefault();
        //    return check;
        //}

        //public Boolean canInsertData(string username, string tableData)
        //{
        //    Boolean check = false;
        //    string query = "";
        //    query += " select gr.InsertData ";
        //    query += " from Users u ";
        //    query += " left join UserInGroup ug ";
        //    query += " on ug.UserID = u.id ";
        //    query += " left join GroupRole gr ";
        //    query += " on ug.GroupID = gr.GroupID ";
        //    query += " where u.username = N'" + username + "' and gr.TableData = N'" + tableData + "' ";

        //    check = context.Database.SqlQuery<Boolean>(query).FirstOrDefault();
        //    return check;
        //}

        //public Boolean canDeleteData(string username, string tableData)
        //{
        //    Boolean check = false;
        //    string query = "";
        //    query += " select gr.DeleteData ";
        //    query += " from Users u ";
        //    query += " left join UserInGroup ug ";
        //    query += " on ug.UserID = u.id ";
        //    query += " left join GroupRole gr ";
        //    query += " on ug.GroupID = gr.GroupID ";
        //    query += " where u.username = N'" + username + "' and gr.TableData = N'" + tableData + "' ";

        //    check = context.Database.SqlQuery<Boolean>(query).FirstOrDefault();
        //    return check;
        //}

        //public Boolean canUpdateData(string username, string tableData)
        //{
        //    Boolean check = false;
        //    string query = "";
        //    query += " select gr.UpdateData ";
        //    query += " from Users u ";
        //    query += " left join UserInGroup ug ";
        //    query += " on ug.UserID = u.id ";
        //    query += " left join GroupRole gr ";
        //    query += " on ug.GroupID = gr.GroupID ";
        //    query += " where u.username = N'" + username + "' and gr.TableData = N'" + tableData + "' ";

        //    check = context.Database.SqlQuery<Boolean>(query).FirstOrDefault();
        //    return check;
        //}

        public Boolean isValid(string username, string password)
        {
            Boolean check = false;
            int id;
            string query = "";
            query += " select u.id ";
            query += " from Users u left join UserInGroup ug ";
            query += "  on ug.UserID = u.id left join GroupUser gu";
            query += "  on ug.GroupID = gu.id";
            query += " where gu.status = 1 AND u.Status = 1 AND u.active = 1";
            query += "  AND u.username = N'" + username + "' and u.pass = N'" + password + "' ";

            id = context.Database.SqlQuery<int>(query).FirstOrDefault();
            if (id > 0)
            {
                check = true;
            }
            return check;
        }
    }
}
