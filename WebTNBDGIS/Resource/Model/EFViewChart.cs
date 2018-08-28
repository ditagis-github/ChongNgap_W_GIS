using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebTNBDGIS.Resource.Model
{
    public class EFViewChart
    {
        private DBContextRainfall context = new DBContextRainfall();

        public IEnumerable<ListNam> getListNam()
        {
            string query = " SELECT DISTINCT(nam) as 'nam'  FROM Binhchanh  order by nam";
            List<ListNam> result = null;

            result = context.Database.SqlQuery<ListNam>(query).ToList();
            return result;
        }

        //public IEnumerable<dataMua> getDataMua(string trammua, string nam)
        //{
        //    string query = " SELECT sum(Thang1) as 'Thang1',sum(Thang2) as 'Thang2',sum(Thang3) as 'Thang3', ";
        //    query += " sum(Thang4) as 'Thang4',sum(Thang5) as 'Thang5',sum(Thang6) as 'Thang6' , ";
        //    query += " sum(Thang7) as 'Thang7',sum(Thang8) as 'Thang8',sum(Thang9) as 'Thang9', ";
        //    query += " sum(Thang10) as 'Thang10',sum(Thang11) as 'Thang11',sum(Thang12) as 'Thang12'  FROM " + trammua + " WHERE Nam =" + nam;
        //    List<dataMua> result = null;

        //    result = context.Database.SqlQuery<dataMua>(query).ToList();
        //    return result;
        //}

        public IEnumerable<DongBoData> getDataNuocDongBo(string query)
        {
            List<DongBoData> result = null;
            result = context.Database.SqlQuery<DongBoData>(query).ToList();
            return result;
        }
        public IEnumerable<dulieumucnuocnam> getDataNuocNam(string query)
        {
            List<dulieumucnuocnam> result = null;
            result = context.Database.SqlQuery<dulieumucnuocnam>(query).ToList();
            return result;
        }
        public IEnumerable<dulieumucnuocThang> getDataNuocThang(string query)
        {
            List<dulieumucnuocThang> result = null;
            result = context.Database.SqlQuery<dulieumucnuocThang>(query).ToList();
            return result;
        }


        public IEnumerable<dataMuaThang> getdataMuaThang(string query)
        {
            List<dataMuaThang> result = null;
            result = context.Database.SqlQuery<dataMuaThang>(query).ToList();
            return result;
        }

        public IEnumerable<dataMuaNgay> getdataMuaNgay(string query)
        {
            List<dataMuaNgay> result = null;
            result = context.Database.SqlQuery<dataMuaNgay>(query).ToList();
            return result;
        }

        public DongBoDataNuocMua getdataDongBoDataNuocMua(string query)
        {
            DongBoDataNuocMua result = null;
            result = context.Database.SqlQuery<DongBoDataNuocMua>(query).FirstOrDefault();
            return result;
        }

        public IEnumerable<dataMuaNam> getdataMuaNam(string query)
        {
            List<dataMuaNam> result = null;
            result = context.Database.SqlQuery<dataMuaNam>(query).ToList();
            return result;
        }

        public IEnumerable<DataNuocTungTram> getDataNuocTungTram(string query)
        {
           
                List<DataNuocTungTram> result = null;
                result = context.Database.SqlQuery<DataNuocTungTram>(query).ToList();
                return result;
           
        }

        public DataNuocByMua getDataMuaTheoNuoc(string query)
        {

            DataNuocByMua result = null;
            result = context.Database.SqlQuery<DataNuocByMua>(query).FirstOrDefault();
            return result;

        }

        public IEnumerable<dataNuoc> getDataNuoc(string tram, string nam, string thang, string ngay)
        {
            string query = " SELECT [0gio]  as 'gio0', [1gio]  as 'gio1', [2gio]  as 'gio2', [3gio]  as 'gio3', " +
                " [4gio]  as 'gio4', [5gio]  as 'gio5', [6gio]  as 'gio6',  [7gio]  as 'gio7', [8gio]  as 'gio8', [9gio]  as 'gio9', " +
                " [10gio]  as 'gio10', [11gio]  as 'gio11', [12gio]  as 'gio12', [13gio]  as 'gio13',  [14gio]  as 'gio14', [15gio]  as 'gio15', " +
                " [16gio]  as 'gio16', [17gio]  as 'gio17', [18gio]  as 'gio18', [19gio]  as 'gio19', [20gio]  as 'gio20'  , [21gio]  as 'gio21'," +
                " [22gio]  as 'gio22', [23gio]  as 'gio23'  FROM " + tram + " WHERE Nam =" + nam + " AND Thang = " + thang + " AND Ngay =" + ngay;
            List<dataNuoc> result = null;
            result = context.Database.SqlQuery<dataNuoc>(query).ToList();
            return result;

        }

        public IEnumerable<dataNuoc> getDataNuoc(string tram, string ngay)
        {
            string query = " SELECT [0gio]  as 'gio0', [1gio]  as 'gio1', [2gio]  as 'gio2', [3gio]  as 'gio3', " +
                " [4gio]  as 'gio4', [5gio]  as 'gio5', [6gio]  as 'gio6',  [7gio]  as 'gio7', [8gio]  as 'gio8', [9gio]  as 'gio9', " +
                " [10gio]  as 'gio10', [11gio]  as 'gio11', [12gio]  as 'gio12', [13gio]  as 'gio13',  [14gio]  as 'gio14', [15gio]  as 'gio15', " +
                " [16gio]  as 'gio16', [17gio]  as 'gio17', [18gio]  as 'gio18', [19gio]  as 'gio19', [20gio]  as 'gio20'  , [21gio]  as 'gio21'," +
                " [22gio]  as 'gio22', [23gio]  as 'gio23'  FROM " + tram + " WHERE TG = '" + ngay + "'";
            List<dataNuoc> result = null;
            result = context.Database.SqlQuery<dataNuoc>(query).ToList();
            return result;

        }

        public IEnumerable<listNuoc> getDataNuocType(string tram, string ngayFrom, string ngayTo, string type)
        {
            string query = "";
            if (type == "2") // trung bình
            {
                query = " SELECT [TB] as 'tbgio',[TG] as 'gio'  FROM " + tram + " WHERE TG >= '" + ngayFrom + "' AND TG <= '" + ngayTo + "'";
            }
            if (type == "3") // lớn nhất
            {
                query = " SELECT [Max] as 'tbgio',[TG] as 'gio'  FROM " + tram + " WHERE TG >= '" + ngayFrom + "' AND TG <= '" + ngayTo + "'";
            }
            if (type == "4") // nhỏ nhất
            {
                query = " SELECT [Min] as 'tbgio',[TG] as 'gio'  FROM " + tram + " WHERE TG >= '" + ngayFrom + "' AND TG <= '" + ngayTo + "'";
            }
            List<listNuoc> result = null;
            result = context.Database.SqlQuery<listNuoc>(query).ToList();
            return result;

        }

        public IEnumerable<dataNuocfullyear> getDataNuocThangType(string tram, int nam, string type)
        {
            string query = "";
            if (type == "2") // trung bình
            {
                query = " SELECT  [TB_T1] as 'Thang1',[TB_T2] as 'Thang2',[TB_T3] as 'Thang3',[TB_T4] as 'Thang4',[TB_T5] as 'Thang5',";
                query += "[TB_T6] as 'Thang6',[TB_T7] as 'Thang7',[TB_T8] as 'Thang8',[TB_T9] as 'Thang9',[TB_T10] as 'Thang10',[TB_T11] as 'Thang11',[TB_T12] as 'Thang12',[TBNam] as 'nam'  FROM " + tram + " WHERE [NamTB] = " + nam + "";
            }
            if (type == "3") // lớn nhất
            {
                query = " SELECT  [Max_T1] as 'Thang1',[Max_T2] as 'Thang2',[Max_T3] as 'Thang3',[Max_T4] as 'Thang4',[Max_T5] as 'Thang5',";
                query+= "[Max_T6] as 'Thang6',[Max_T7] as 'Thang7',[Max_T8] as 'Thang8',[Max_T9] as 'Thang9',[Max_T10] as 'Thang10',[Max_T11] as 'Thang11',[Max_T12] as 'Thang12',[MaxNam] as 'nam'  FROM " + tram + " WHERE [NamMax] = " + nam + "";
            }
            if (type == "4") // nhỏ nhất
            {
                query = " SELECT  [Min_T1] as 'Thang1',[Min_T2] as 'Thang2',[Min_T3] as 'Thang3',[Min_T4] as 'Thang4',[Min_T5] as 'Thang5', ";
                query += "[Min_T6] as 'Thang6',[Min_T7] as 'Thang7',[Min_T8] as 'Thang8',[Min_T9] as 'Thang9',[Min_T10] as 'Thang10',[Min_T11] as 'Thang11',[Min_T12] as 'Thang12',[MinNam] as 'nam'  FROM " + tram + " WHERE [NamMin] >= " + nam + "";
            }
            List<dataNuocfullyear> result = null;
            result = context.Database.SqlQuery<dataNuocfullyear>(query).ToList();
            return result;

        }


        public IEnumerable<dataMuafullyearTuan> getMaxDataMuaTuan(string tram, int namF, int namTo, int tuan)
        {
            string query = "";
                query = " SELECT nam,tuan, MAX([Thang1]) as 'Thang1',MAX([Thang2]) as 'Thang2',MAX([Thang3]) as 'Thang3',MAX([Thang4]) as 'Thang4',MAX([Thang5]) as 'Thang5',";
                query += "MAX([Thang6]) as 'Thang6',MAX([Thang7]) as 'Thang7',MAX([Thang8]) as 'Thang8',MAX([Thang9]) as 'Thang9',MAX([Thang10]) as 'Thang10',MAX([Thang11]) as 'Thang11',MAX([Thang12]) as 'Thang12'  FROM " + tram + " WHERE NAM >= " + namF + " AND NAM <= " + namTo + " AND Tuan = " + tuan + " group by nam , tuan  order by nam , tuan";
           
            List<dataMuafullyearTuan> result = null;
            result = context.Database.SqlQuery<dataMuafullyearTuan>(query).ToList();
            return result;

        }

        public IEnumerable<dataMuafullyear> getMaxDataMua(string tram, int namF ,int namTo)
        {
            string query = "";
            query = " SELECT nam, MAX([Thang1]) as 'Thang1',MAX([Thang2]) as 'Thang2',MAX([Thang3]) as 'Thang3',MAX([Thang4]) as 'Thang4',MAX([Thang5]) as 'Thang5',";
            query += "MAX([Thang6]) as 'Thang6',MAX([Thang7]) as 'Thang7',MAX([Thang8]) as 'Thang8',MAX([Thang9]) as 'Thang9',MAX([Thang10]) as 'Thang10',MAX([Thang11]) as 'Thang11',MAX([Thang12]) as 'Thang12'  FROM " + tram + " WHERE NAM >= " + namF + " AND NAM <= "+ namTo + " group by nam order by nam ";

            List<dataMuafullyear> result = null;
            result = context.Database.SqlQuery<dataMuafullyear>(query).ToList();
            return result;

        }

        public IEnumerable<nuocnam> getDataNuocNamType(string tram, int namFrom, int namTo, string type)
        {
            string query = "";
            if (type == "2") // trung bình
            {
                query = " SELECT [TBNam] as 'value',[NamTB] as 'nam'  FROM " + tram + " WHERE NamTB >= '" + namFrom + "' AND NamTB <= '" + namTo + "'";
            }
            if (type == "3") // lớn nhất
            {
                query = " SELECT [MaxNam] as 'value',[NamMax] as 'nam'  FROM " + tram + " WHERE NamMax >= '" + namFrom + "' AND NamMax <= '" + namTo + "'";
            }
            if (type == "4") // nhỏ nhất
            {
                query = " SELECT [MinNam] as 'value',[NamMin] as 'nam'  FROM " + tram + " WHERE NamMin >= '" + namFrom + "' AND NamMin <= '" + namTo + "'";
            }
            List<nuocnam> result = null;
            result = context.Database.SqlQuery<nuocnam>(query).ToList();
            return result;

        }

        public IEnumerable<BienDoTrieu> getBienDoTrieu(string tram, int ngayFrom, int ngayTo,int thangFrom,int thangTo, int nam, int namt)
        {
            string query = "";
            query = " SELECT nam ,TG , [Max],[Min] ,[Max] - [Min] as 'BD'  FROM " + tram + " WHERE Nam >= '" + nam + "' AND Nam <= '" + namt + "'  AND thang >= " + thangFrom + " AND thang <= " + thangTo + "AND Ngay >= " + ngayFrom + " AND Ngay <= " + ngayTo;


            List<BienDoTrieu> result = null;
            result = context.Database.SqlQuery<BienDoTrieu>(query).ToList();
            return result;

        }
        public IEnumerable<BienDoTrieuThang> getBienDoTrieuThang(string tram, int ngayFrom, int ngayTo, int nam, int namt)
        {
            string query = "";
            query = " SELECT  nam, thang,Max ( [Max] - [min] ) as 'BD'  FROM " + tram + " WHERE Nam >= '" + nam + "' AND Nam <= '" + namt + "'  AND thang >= " + ngayFrom + " AND thang <= "+ ngayTo +"  group by  nam,thang  order by nam , thang";

            List<BienDoTrieuThang> result = null;
            result = context.Database.SqlQuery<BienDoTrieuThang>(query).ToList();
            return result;

        }

        public IEnumerable<BienDoTrieuNam> getBienDoTrieuNam(string tram, int namF , int namT)
        {
            string query = "";
            query = " SELECT  nam,Max ( [Max] - [min] ) as 'BD'  FROM " + tram + " WHERE Nam >= " + namF + " AND Nam <= " + namT + "  group by  nam  order by nam ";

            List<BienDoTrieuNam> result = null;
            result = context.Database.SqlQuery<BienDoTrieuNam>(query).ToList();
            return result;

        }

    }
}