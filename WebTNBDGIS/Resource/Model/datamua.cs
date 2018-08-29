using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebTNBDGIS.Resource.Model
{
    public class datamua
    {
        public string key { get; set; }
        public double? value { get; set; }
    }


    public class muanam
    {
        public int nam { get; set; }
        public double? value { get; set; }
    }
    public class dataMuafullyearTuan
    {
        public int nam { get; set; }
        public int tuan { get; set; }
        public Double? Thang1 { get; set; }
        public Double? Thang2 { get; set; }
        public Double? Thang3 { get; set; }
        public Double? Thang4 { get; set; }
        public Double? Thang5 { get; set; }
        public Double? Thang6 { get; set; }
        public Double? Thang7 { get; set; }
        public Double? Thang8 { get; set; }
        public Double? Thang9 { get; set; }
        public Double? Thang10 { get; set; }
        public Double? Thang11 { get; set; }
        public Double? Thang12 { get; set; }
    }
    public class dataMuafullyear
    {
        public int nam { get; set; }
        public Double? Thang1 { get; set; }
        public Double? Thang2 { get; set; }
        public Double? Thang3 { get; set; }
        public Double? Thang4 { get; set; }
        public Double? Thang5 { get; set; }
        public Double? Thang6 { get; set; }
        public Double? Thang7 { get; set; }
        public Double? Thang8 { get; set; }
        public Double? Thang9 { get; set; }
        public Double? Thang10 { get; set; }
        public Double? Thang11 { get; set; }
        public Double? Thang12 { get; set; }
    }

    public class dataNuocfullyear
    {
        public Double nam { get; set; }
        public Double? Thang1 { get; set; }
        public Double? Thang2 { get; set; }
        public Double? Thang3 { get; set; }
        public Double? Thang4 { get; set; }
        public Double? Thang5 { get; set; }
        public Double? Thang6 { get; set; }
        public Double? Thang7 { get; set; }
        public Double? Thang8 { get; set; }
        public Double? Thang9 { get; set; }
        public Double? Thang10 { get; set; }
        public Double? Thang11 { get; set; }
        public Double? Thang12 { get; set; }
    }


    /////////////////


    public class dataNuoc
    {
        public Double? gio0 { get; set; }
        public Double? gio1 { get; set; }
        public Double? gio2 { get; set; }
        public Double? gio3 { get; set; }
        public Double? gio4 { get; set; }
        public Double? gio5 { get; set; }
        public Double? gio6 { get; set; }
        public Double? gio7 { get; set; }
        public Double? gio8 { get; set; }
        public Double? gio9 { get; set; }
        public Double? gio10 { get; set; }
        public Double? gio11 { get; set; }
        public Double? gio12 { get; set; }
        public Double? gio13 { get; set; }
        public Double? gio14 { get; set; }
        public Double? gio15 { get; set; }
        public Double? gio16 { get; set; }
        public Double? gio17 { get; set; }
        public Double? gio18 { get; set; }
        public Double? gio19 { get; set; }
        public Double? gio20 { get; set; }
        public Double? gio21 { get; set; }
        public Double? gio22 { get; set; }
        public Double? gio23 { get; set; }
    }

    public class nuoc
    {
        public string thang { get; set; }
        public double? tbThang { get; set; }
    }

    public class dinhtrieu
    {
        public string gio { get; set; }
        public double? tbgio { get; set; }
    }

    public class nuocnam
    {
        public double nam { get; set; }
        public double? value { get; set; }
    }

    public class listNuoc
    {
        public DateTime gio { get; set; }
        public double? tbgio { get; set; }
    }

    public class ListNam
    {
        public int nam { get; set; }
    }

    public class BienDoTrieu
    {
        public Double? nam { get; set; }
        public DateTime TG { get; set; }
        public Double? max { get; set; }
        public Double? min { get; set; }
        public Double? BD { get; set; }
    }


    public class BienDoTrieuThang
    {
        public Double Nam { get; set; }
        public Double Thang { get; set; }
        public Double? BD { get; set; }
    }

    public class BienDoTrieuNam
    {
        public Double Nam { get; set; }
        public Double? BD { get; set; }
    }

    public class DongBoData
    {
        public Double? Nam { get; set; }
        public Double? Thang { get; set; }
        public DateTime Ngay { get; set; }
        public Double? Vung_Tau { get; set; }
        public Double? Nha_Be { get; set; }
        public Double? Ben_Luc { get; set; }
        public Double? Bien_Hoa { get; set; }
        public Double? Phu_An { get; set; }
        public Double? Tan_An { get; set; }
        public Double? TD_Mot { get; set; }
    }

    public class DongBoDataNuocMua
    {
        public DateTime TG { get; set; }
        public Double? Vung_Tau_TB { get; set; }
        public Double? Nha_Be_TB { get; set; }
        public Double? Ben_Luc_TB { get; set; }
        public Double? Bien_Hoa_TB { get; set; }
        public Double? Phu_An_TB { get; set; }
        public Double? Tan_An_TB { get; set; }
        public Double? TD_Mot_TB { get; set; }

        public Double? Vung_Tau_Max { get; set; }
        public Double? Nha_Be_Max { get; set; }
        public Double? Ben_Luc_Max { get; set; }
        public Double? Bien_Hoa_Max { get; set; }
        public Double? Phu_An_Max { get; set; }
        public Double? Tan_An_Max { get; set; }
        public Double? TD_Mot_Max { get; set; }

        public Double? Vung_Tau_Min { get; set; }
        public Double? Nha_Be_Min { get; set; }
        public Double? Ben_Luc_Min { get; set; }
        public Double? Bien_Hoa_Min { get; set; }
        public Double? Phu_An_Min { get; set; }
        public Double? Tan_An_Min { get; set; }
        public Double? TD_Mot_Min { get; set; }
    }


    public class dulieumucnuocnam
    {
        public double thoigian { get; set; }
        public double? Ben_Luc { get; set; }
        public double? Bien_Hoa { get; set; }
        public double? Nha_Be { get; set; }
        public double? Phu_An { get; set; }
        public double? Tan_An { get; set; }
        public double? TD_Mot { get; set; }
        public double? Vung_Tau { get; set; }
    }


    public class dulieumucnuocThang
    {
        public double thoigian { get; set; }
        public double? Ben_Luc_T1 { get; set; }
        public double? Ben_Luc_T2 { get; set; }
        public double? Ben_Luc_T3 { get; set; }
        public double? Ben_Luc_T4 { get; set; }
        public double? Ben_Luc_T5 { get; set; }
        public double? Ben_Luc_T6 { get; set; }
        public double? Ben_Luc_T7 { get; set; }
        public double? Ben_Luc_T8 { get; set; }
        public double? Ben_Luc_T9 { get; set; }
        public double? Ben_Luc_T10 { get; set; }
        public double? Ben_Luc_T11 { get; set; }
        public double? Ben_Luc_T12 { get; set; }
        public double? Bien_Hoa_T1 { get; set; }
        public double? Bien_Hoa_T2 { get; set; }
        public double? Bien_Hoa_T3 { get; set; }
        public double? Bien_Hoa_T4 { get; set; }
        public double? Bien_Hoa_T5 { get; set; }
        public double? Bien_Hoa_T6 { get; set; }
        public double? Bien_Hoa_T7 { get; set; }
        public double? Bien_Hoa_T8 { get; set; }
        public double? Bien_Hoa_T9 { get; set; }
        public double? Bien_Hoa_T10 { get; set; }
        public double? Bien_Hoa_T11 { get; set; }
        public double? Bien_Hoa_T12 { get; set; }
        public double? Nha_Be_T1 { get; set; }
        public double? Nha_Be_T2 { get; set; }
        public double? Nha_Be_T3 { get; set; }
        public double? Nha_Be_T4 { get; set; }
        public double? Nha_Be_T5 { get; set; }
        public double? Nha_Be_T6 { get; set; }
        public double? Nha_Be_T7 { get; set; }
        public double? Nha_Be_T8 { get; set; }
        public double? Nha_Be_T9 { get; set; }
        public double? Nha_Be_T10 { get; set; }
        public double? Nha_Be_T11 { get; set; }
        public double? Nha_Be_T12 { get; set; }
        public double? Phu_An_T1 { get; set; }
        public double? Phu_An_T2 { get; set; }
        public double? Phu_An_T3 { get; set; }
        public double? Phu_An_T4 { get; set; }
        public double? Phu_An_T5 { get; set; }
        public double? Phu_An_T6 { get; set; }
        public double? Phu_An_T7 { get; set; }
        public double? Phu_An_T8 { get; set; }
        public double? Phu_An_T9 { get; set; }
        public double? Phu_An_T10 { get; set; }
        public double? Phu_An_T11 { get; set; }
        public double? Phu_An_T12 { get; set; }
        public double? Tan_An_T1 { get; set; }
        public double? Tan_An_T2 { get; set; }
        public double? Tan_An_T3 { get; set; }
        public double? Tan_An_T4 { get; set; }
        public double? Tan_An_T5 { get; set; }
        public double? Tan_An_T6 { get; set; }
        public double? Tan_An_T7 { get; set; }
        public double? Tan_An_T8 { get; set; }
        public double? Tan_An_T9 { get; set; }
        public double? Tan_An_T10 { get; set; }
        public double? Tan_An_T11 { get; set; }
        public double? Tan_An_T12 { get; set; }
        public double? TD_Mot_T1 { get; set; }
        public double? TD_Mot_T2 { get; set; }
        public double? TD_Mot_T3 { get; set; }
        public double? TD_Mot_T4 { get; set; }
        public double? TD_Mot_T5 { get; set; }
        public double? TD_Mot_T6 { get; set; }
        public double? TD_Mot_T7 { get; set; }
        public double? TD_Mot_T8 { get; set; }
        public double? TD_Mot_T9 { get; set; }
        public double? TD_Mot_T10 { get; set; }
        public double? TD_Mot_T11 { get; set; }
        public double? TD_Mot_T12 { get; set; }
        public double? Vung_Tau_T1 { get; set; }
        public double? Vung_Tau_T2 { get; set; }
        public double? Vung_Tau_T3 { get; set; }
        public double? Vung_Tau_T4 { get; set; }
        public double? Vung_Tau_T5 { get; set; }
        public double? Vung_Tau_T6 { get; set; }
        public double? Vung_Tau_T7 { get; set; }
        public double? Vung_Tau_T8 { get; set; }
        public double? Vung_Tau_T9 { get; set; }
        public double? Vung_Tau_T10 { get; set; }
        public double? Vung_Tau_T11 { get; set; }
        public double? Vung_Tau_T12 { get; set; }
    }

    public class dataMuaNgay
    {
        public int ngay { get; set; }
        public int nam { get; set; }
        public Double? Binhchanh_Thang1 { get; set; }
        public Double? Binhchanh_Thang2 { get; set; }
        public Double? Binhchanh_Thang3 { get; set; }
        public Double? Binhchanh_Thang4 { get; set; }
        public Double? Binhchanh_Thang5 { get; set; }
        public Double? Binhchanh_Thang6 { get; set; }
        public Double? Binhchanh_Thang7 { get; set; }
        public Double? Binhchanh_Thang8 { get; set; }
        public Double? Binhchanh_Thang9 { get; set; }
        public Double? Binhchanh_Thang10 { get; set; }
        public Double? Binhchanh_Thang11 { get; set; }
        public Double? Binhchanh_Thang12 { get; set; }
        public Double? Cuchi_Thang1 { get; set; }
        public Double? Cuchi_Thang2 { get; set; }
        public Double? Cuchi_Thang3 { get; set; }
        public Double? Cuchi_Thang4 { get; set; }
        public Double? Cuchi_Thang5 { get; set; }
        public Double? Cuchi_Thang6 { get; set; }
        public Double? Cuchi_Thang7 { get; set; }
        public Double? Cuchi_Thang8 { get; set; }
        public Double? Cuchi_Thang9 { get; set; }
        public Double? Cuchi_Thang10 { get; set; }
        public Double? Cuchi_Thang11 { get; set; }
        public Double? Cuchi_Thang12 { get; set; }
        public Double? Hocmon_Thang1 { get; set; }
        public Double? Hocmon_Thang2 { get; set; }
        public Double? Hocmon_Thang3 { get; set; }
        public Double? Hocmon_Thang4 { get; set; }
        public Double? Hocmon_Thang5 { get; set; }
        public Double? Hocmon_Thang6 { get; set; }
        public Double? Hocmon_Thang7 { get; set; }
        public Double? Hocmon_Thang8 { get; set; }
        public Double? Hocmon_Thang9 { get; set; }
        public Double? Hocmon_Thang10 { get; set; }
        public Double? Hocmon_Thang11 { get; set; }
        public Double? Hocmon_Thang12 { get; set; }
        public Double? Macdinhchi_Thang1 { get; set; }
        public Double? Macdinhchi_Thang2 { get; set; }
        public Double? Macdinhchi_Thang3 { get; set; }
        public Double? Macdinhchi_Thang4 { get; set; }
        public Double? Macdinhchi_Thang5 { get; set; }
        public Double? Macdinhchi_Thang6 { get; set; }
        public Double? Macdinhchi_Thang7 { get; set; }
        public Double? Macdinhchi_Thang8 { get; set; }
        public Double? Macdinhchi_Thang9 { get; set; }
        public Double? Macdinhchi_Thang10 { get; set; }
        public Double? Macdinhchi_Thang11 { get; set; }
        public Double? Macdinhchi_Thang12 { get; set; }
        public Double? Nhabe_Thang1 { get; set; }
        public Double? Nhabe_Thang2 { get; set; }
        public Double? Nhabe_Thang3 { get; set; }
        public Double? Nhabe_Thang4 { get; set; }
        public Double? Nhabe_Thang5 { get; set; }
        public Double? Nhabe_Thang6 { get; set; }
        public Double? Nhabe_Thang7 { get; set; }
        public Double? Nhabe_Thang8 { get; set; }
        public Double? Nhabe_Thang9 { get; set; }
        public Double? Nhabe_Thang10 { get; set; }
        public Double? Nhabe_Thang11 { get; set; }
        public Double? Nhabe_Thang12 { get; set; }
        public Double? Tansonhoa_Thang1 { get; set; }
        public Double? Tansonhoa_Thang2 { get; set; }
        public Double? Tansonhoa_Thang3 { get; set; }
        public Double? Tansonhoa_Thang4 { get; set; }
        public Double? Tansonhoa_Thang5 { get; set; }
        public Double? Tansonhoa_Thang6 { get; set; }
        public Double? Tansonhoa_Thang7 { get; set; }
        public Double? Tansonhoa_Thang8 { get; set; }
        public Double? Tansonhoa_Thang9 { get; set; }
        public Double? Tansonhoa_Thang10 { get; set; }
        public Double? Tansonhoa_Thang11 { get; set; }
        public Double? Tansonhoa_Thang12 { get; set; }
    }


    public class dataMuaThang
    {
        public int nam { get; set; }
        public Double? Binhchanh_Thang1 { get; set; }
        public Double? Binhchanh_Thang2 { get; set; }
        public Double? Binhchanh_Thang3 { get; set; }
        public Double? Binhchanh_Thang4 { get; set; }
        public Double? Binhchanh_Thang5 { get; set; }
        public Double? Binhchanh_Thang6 { get; set; }
        public Double? Binhchanh_Thang7 { get; set; }
        public Double? Binhchanh_Thang8 { get; set; }
        public Double? Binhchanh_Thang9 { get; set; }
        public Double? Binhchanh_Thang10 { get; set; }
        public Double? Binhchanh_Thang11 { get; set; }
        public Double? Binhchanh_Thang12 { get; set; }
        public Double? Cuchi_Thang1 { get; set; }
        public Double? Cuchi_Thang2 { get; set; }
        public Double? Cuchi_Thang3 { get; set; }
        public Double? Cuchi_Thang4 { get; set; }
        public Double? Cuchi_Thang5 { get; set; }
        public Double? Cuchi_Thang6 { get; set; }
        public Double? Cuchi_Thang7 { get; set; }
        public Double? Cuchi_Thang8 { get; set; }
        public Double? Cuchi_Thang9 { get; set; }
        public Double? Cuchi_Thang10 { get; set; }
        public Double? Cuchi_Thang11 { get; set; }
        public Double? Cuchi_Thang12 { get; set; }
        public Double? Hocmon_Thang1 { get; set; }
        public Double? Hocmon_Thang2 { get; set; }
        public Double? Hocmon_Thang3 { get; set; }
        public Double? Hocmon_Thang4 { get; set; }
        public Double? Hocmon_Thang5 { get; set; }
        public Double? Hocmon_Thang6 { get; set; }
        public Double? Hocmon_Thang7 { get; set; }
        public Double? Hocmon_Thang8 { get; set; }
        public Double? Hocmon_Thang9 { get; set; }
        public Double? Hocmon_Thang10 { get; set; }
        public Double? Hocmon_Thang11 { get; set; }
        public Double? Hocmon_Thang12 { get; set; }
        public Double? Macdinhchi_Thang1 { get; set; }
        public Double? Macdinhchi_Thang2 { get; set; }
        public Double? Macdinhchi_Thang3 { get; set; }
        public Double? Macdinhchi_Thang4 { get; set; }
        public Double? Macdinhchi_Thang5 { get; set; }
        public Double? Macdinhchi_Thang6 { get; set; }
        public Double? Macdinhchi_Thang7 { get; set; }
        public Double? Macdinhchi_Thang8 { get; set; }
        public Double? Macdinhchi_Thang9 { get; set; }
        public Double? Macdinhchi_Thang10 { get; set; }
        public Double? Macdinhchi_Thang11 { get; set; }
        public Double? Macdinhchi_Thang12 { get; set; }
        public Double? Nhabe_Thang1 { get; set; }
        public Double? Nhabe_Thang2 { get; set; }
        public Double? Nhabe_Thang3 { get; set; }
        public Double? Nhabe_Thang4 { get; set; }
        public Double? Nhabe_Thang5 { get; set; }
        public Double? Nhabe_Thang6 { get; set; }
        public Double? Nhabe_Thang7 { get; set; }
        public Double? Nhabe_Thang8 { get; set; }
        public Double? Nhabe_Thang9 { get; set; }
        public Double? Nhabe_Thang10 { get; set; }
        public Double? Nhabe_Thang11 { get; set; }
        public Double? Nhabe_Thang12 { get; set; }
        public Double? Tansonhoa_Thang1 { get; set; }
        public Double? Tansonhoa_Thang2 { get; set; }
        public Double? Tansonhoa_Thang3 { get; set; }
        public Double? Tansonhoa_Thang4 { get; set; }
        public Double? Tansonhoa_Thang5 { get; set; }
        public Double? Tansonhoa_Thang6 { get; set; }
        public Double? Tansonhoa_Thang7 { get; set; }
        public Double? Tansonhoa_Thang8 { get; set; }
        public Double? Tansonhoa_Thang9 { get; set; }
        public Double? Tansonhoa_Thang10 { get; set; }
        public Double? Tansonhoa_Thang11 { get; set; }
        public Double? Tansonhoa_Thang12 { get; set; }
    }

    public class dataMuaNam
    {
        public int nam { get; set; }
        public Double? Binhchanh { get; set; }
        public Double? Cuchi { get; set; }
        public Double? Hocmon { get; set; }
        public Double? Macdinhchi { get; set; }
        public Double? Nhabe { get; set; }
        public Double? Tansonhoa { get; set; }
    }

    public class DataNuocTungTram
    {
        public Double? Nam { get; set; }
        public Double? Thang { get; set; }
        public DateTime Ngay { get; set; }
        public Double TB { get; set; }
        public Double Max { get; set; }
        public Double Min { get; set; }
    }

    public class DataNuocByMua
    {
        public int Nam { get; set; }
        public int Ngay { get; set; }
        public int Tuan { get; set; }
        public Double? BinhChanh { get; set; }
        public Double? HocMon { get; set; }
        public Double? Cuchi { get; set; }
        public Double? Macdinhchi { get; set; }
        public Double? Nhabe { get; set; }
        public Double? Tansonhoa { get; set; }

    }


}