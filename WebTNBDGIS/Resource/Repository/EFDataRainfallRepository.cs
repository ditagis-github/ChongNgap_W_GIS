using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebTNBDGIS.Resource.Model;

namespace WebTNBDGIS.Resource.Repository
{
    public interface IEFDataRainfallRepository
    {
        IQueryable<Binhchanh> getBinhChanh { get; }
        IQueryable<Cuchi> getCuchi { get; }
        IQueryable<Hocmon> getHocmon { get; }
        IQueryable<Nhabe> getNhabe { get; }
        IQueryable<Tansonhoa> getTansonhoa { get; }
        IQueryable<Macdinhchi> getMacdinhchi { get; }
        dataMuafullyear getdatamuaFullYear(string query);
        List<dataMuafullyear> getdatamuaFullYearofMonth(string query);
        List<muanam> getdatamuabyNam(string query);
        List<thongtinmua> getdatamuabyDate(string query, int year, int date);

        bool checkHasTable(string table);


        IQueryable<Ben_Luc> getNuocBen_Luc { get;  }
        IQueryable<Bien_Hoa> getNuocBien_Hoa { get;  }
        IQueryable<Nha_Be> getNuocNha_Be { get;  }
        IQueryable<Phu_An> getNuocPhu_An { get;  }
        IQueryable<Tan_An> getNuocTan_An { get;  }
        IQueryable<TD_Mot> getNuocTD_Mot { get;  }
        IQueryable<Vung_Tau> getNuocVung_Tau { get;  }

    }
    public class EFDataRainfallRepository : IEFDataRainfallRepository
    {
        private DBContextRainfall context = new DBContextRainfall();
        public IQueryable<Binhchanh> getBinhChanh { get { return context.Binhchanhs; } }
        public IQueryable<Cuchi> getCuchi { get { return context.Cuchis; } }
        public IQueryable<Hocmon> getHocmon { get { return context.Hocmons; } }
        public IQueryable<Nhabe> getNhabe { get { return context.Nhabes; } }
        public IQueryable<Tansonhoa> getTansonhoa { get { return context.Tansonhoas; } }
        public IQueryable<Macdinhchi> getMacdinhchi { get { return context.Macdinhchis; } }
        public dataMuafullyear getdatamuaFullYear ( string query)
        {
            dataMuafullyear list;

            list = context.Database.SqlQuery<dataMuafullyear>(query).FirstOrDefault();

            return list;
        }
        public List<dataMuafullyear> getdatamuaFullYearofMonth(string query)
        {
            List <dataMuafullyear> list;

            list = context.Database.SqlQuery<dataMuafullyear>(query).ToList();

            return list;
        }

        public List<muanam> getdatamuabyNam(string query)
        {
            List<muanam> list;

            list = context.Database.SqlQuery<muanam>(query).ToList();

            return list;
        }

        public List<thongtinmua> getdatamuabyDate(string query,int year,int date)
        {
            List<thongtinmua> list;

            SqlParameter[] pare = new SqlParameter[2];
            pare[0] = new SqlParameter("@nam", year);
            pare[1] = new SqlParameter("@ngay", date);
            list = context.Database.SqlQuery<thongtinmua>(query,pare).ToList();

            return list;
        }

        public bool checkHasTable(string table)
        {
            string query = "  SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = @table";
            SqlParameter[] pare = new SqlParameter[1];
            pare[0] = new SqlParameter("@table", table);
            string tableData =  context.Database.SqlQuery<string>(query, pare).FirstOrDefault();
            if(tableData == null)
            {
                return false;
            }
            if(tableData.Trim().Length > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }



        public IQueryable<Ben_Luc> getNuocBen_Luc { get { return context.Ben_Luc; } }
        public IQueryable<Bien_Hoa> getNuocBien_Hoa { get { return context.Bien_Hoa; } }
        public IQueryable<Nha_Be> getNuocNha_Be { get { return context.Nha_Be; } }
        public IQueryable<Phu_An> getNuocPhu_An { get { return context.Phu_An; } }
        public IQueryable<Tan_An> getNuocTan_An { get { return context.Tan_An; } }
        public IQueryable<TD_Mot> getNuocTD_Mot { get { return context.TD_Mot; } }
        public IQueryable<Vung_Tau> getNuocVung_Tau { get { return context.Vung_Tau; } }

    }
}