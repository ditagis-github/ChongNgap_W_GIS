using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebTNBDGIS.Models;
using WebTNBDGIS.Resource.Model;

namespace WebTNBDGIS.Models
{
    public class EFGroupRoleRepository : IGroupRoleRepository
    {
        private DBContextRainfall context = new DBContextRainfall();

        public IQueryable<GroupRole> GroupRoles
        {
            get { return context.GroupRoles; }
        }
        public string saveGroupRole(GroupRole groupRole)
        {
            if (groupRole.id == 0)
            {
                context.GroupRoles.Add(groupRole);
            }
            else
            {
                GroupRole dbEntry = context.GroupRoles.Find(groupRole.id);
                if (dbEntry != null)
                {
                    dbEntry.QuanTriNguoiDung = groupRole.QuanTriNguoiDung;
                    dbEntry.TimKiem = groupRole.TimKiem;
                    dbEntry.ThongKe = groupRole.ThongKe;
                    dbEntry.XuatExcel = groupRole.XuatExcel;
                    dbEntry.XuatFileHinh = groupRole.XuatFileHinh;
                    dbEntry.XuatBieuDo = groupRole.XuatBieuDo;
                    dbEntry.BaoCaoSuCo = groupRole.BaoCaoSuCo;
                    dbEntry.BaoCaoDuyTu = groupRole.BaoCaoDuyTu;
                    dbEntry.ViewKML = groupRole.ViewKML;
                    dbEntry.ViewRelationLink = groupRole.ViewRelationLink;
                    dbEntry.ViewFile = groupRole.ViewFile;
                    dbEntry.AddFile = groupRole.AddFile;
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
        public string deleteGroupRole(int id)
        {
            GroupRole dbEntry = context.GroupRoles.Find(id);
            string result = "";
            if (dbEntry != null)
            {
                try
                {
                    context.GroupRoles.Remove(dbEntry);
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
