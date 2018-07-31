using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebTNBDGIS.Models;

namespace WebTNBDGIS.Controllers
{
    public class HomeController : Controller
    {

        private IGISRepository gisRepository;
        public HomeController(IGISRepository gisRepository)
        {
            this.gisRepository = gisRepository;
        }


        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Map()
        {
            return View();
        }



        //// get data ////


        public LargeJsonResult getHIENTRANG_BECHUA(string DVQuanLy, string QuanHuyen, string PhuongXa)
        {
            try
            {
                ArrayList list = new ArrayList();
                SqlParameter param;
                string where = " WHERE 1=1";

                if (DVQuanLy.Length > 0)
                {
                    int dvql = int.Parse(DVQuanLy);
                    if (dvql > -1)
                    {
                        param = new SqlParameter("@DonViQuanLy", DVQuanLy);
                        where += " AND DonViQuanLy=@DonViQuanLy";
                        list.Add(param);
                    }
                }
                if (QuanHuyen.Length > 0)
                {
                    param = new SqlParameter("@MaQuanHuyen", QuanHuyen);
                    where += " AND MaQuanHuyen=@MaQuanHuyen";
                    list.Add(param);
                }
                if (PhuongXa.Length > 0)
                {
                    param = new SqlParameter("@MaPhuongXa", PhuongXa);
                    where += " AND MaPhuongXa=@MaPhuongXa";
                    list.Add(param);
                }
                string query = "SELECT OBJECTID,TenBeChua,DienTich,CongSuat,DonViQuanLy,NgayCapNhat,NguoiCapNhat,DonViCapNhat,";
                query += "GhiChu,MaDoiTuong,MaPhuongXa,MaQuanHuyen,GiaiDoanQuyHoach,ToaDoX,ToaDoY ";
                query += " FROM HIENTRANG_BECHUA " + where;
                List<HIENTRANG_BECHUA> listResult = this.gisRepository.HIENTRANG_BECHUA(query, list);
                return new LargeJsonResult { Data = listResult, JsonRequestBehavior = System.Web.Mvc.JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public LargeJsonResult getHIENTRANG_GIENG(string DVQuanLy, string QuanHuyen, string PhuongXa)
        {
            try
            {
                ArrayList list = new ArrayList();
                SqlParameter param;
                string where = " WHERE 1=1";

                if (DVQuanLy.Length > 0)
                {
                    int dvql = int.Parse(DVQuanLy);
                    if (dvql > -1)
                    {
                        param = new SqlParameter("@DonViQuanLy", DVQuanLy);
                        where += " AND DonViQuanLy=@DonViQuanLy";
                        list.Add(param);
                    }
                }
                if (QuanHuyen.Length > 0)
                 {
                    param = new SqlParameter("@MaQuanHuyen", QuanHuyen);
                    where += " AND MaQuanHuyen=@MaQuanHuyen";
                    list.Add(param);
                }
                if (PhuongXa.Length > 0)
                {
                    param = new SqlParameter("@MaPhuongXa", PhuongXa);
                    where += " AND MaPhuongXa=@MaPhuongXa";
                    list.Add(param);
                }
                string query = "SELECT OBJECTID,ToaDoX,ToaDoY,CongSuat,TinhTrangGieng,NgayCapNhat,NguoiCapNhat,DonViCapNhat,DonViQuanLy,HinhAnh,GhiChu,VatLieu,DoSau,MaDoiTuong,MaPhuongXa,MaQuanHuyen,GiaiDoanQuyHoach ";
                query += " FROM HIENTRANG_GIENG " + where;
                List<HIENTRANG_GIENG> listResult = this.gisRepository.HIENTRANG_GIENG(query, list);
                return new LargeJsonResult { Data = listResult, JsonRequestBehavior = System.Web.Mvc.JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public LargeJsonResult getHIENTRANG_CONGTHOATNUOC(string DVQuanLy, string QuanHuyen, string PhuongXa)
        {
            try
            {
                ArrayList list = new ArrayList();
                SqlParameter param;
                string where = " WHERE 1=1";

                if (DVQuanLy.Length > 0)
                {
                    int dvql = int.Parse(DVQuanLy);
                    if (dvql > -1)
                    {
                        param = new SqlParameter("@DonViQuanLy", DVQuanLy);
                        where += " AND DonViQuanLy=@DonViQuanLy";
                        list.Add(param);
                    }
                }
                if (QuanHuyen.Length > 0)
                {
                    param = new SqlParameter("@MaQuanHuyen", QuanHuyen);
                    where += " AND MaQuanHuyen=@MaQuanHuyen";
                    list.Add(param);
                }
                if (PhuongXa.Length > 0)
                {
                    param = new SqlParameter("@MaPhuongXa", PhuongXa);
                    where += " AND MaPhuongXa=@MaPhuongXa";
                    list.Add(param);
                }
                string query = "SELECT OBJECTID,ChieuDai,DoDoc,DoSau,VatLieu,LoaiCongThoatNuoc,NgayCapNhat,NguoiCapNhat,DonViCapNhat,DonViQuanLy,GiaiDoanQuyHoach,LuuLuong,VanToc,DuongKinh,MaDoiTuong,MaPhuongXa,MaQuanHuyen,GhiChu ";
                query += " FROM HIENTRANG_CONGTHOATNUOC " + where;
                List<HIENTRANG_CONGTHOATNUOC> listResult = this.gisRepository.HIENTRANG_CONGTHOATNUOC(query, list);
                return new LargeJsonResult { Data = listResult, JsonRequestBehavior = System.Web.Mvc.JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public LargeJsonResult getHIENTRANG_HOGA(string DVQuanLy, string QuanHuyen, string PhuongXa)
        {
            try
            {
                ArrayList list = new ArrayList();
                SqlParameter param;
                string where = " WHERE 1=1";

                if (DVQuanLy.Length > 0)
                {
                    int dvql = int.Parse(DVQuanLy);
                    if (dvql > -1)
                    {
                        param = new SqlParameter("@DonViQuanLy", DVQuanLy);
                        where += " AND DonViQuanLy=@DonViQuanLy";
                        list.Add(param);
                    }
                }
                if (QuanHuyen.Length > 0)
                {
                    param = new SqlParameter("@MaQuanHuyen", QuanHuyen);
                    where += " AND MaQuanHuyen=@MaQuanHuyen";
                    list.Add(param);
                }
                if (PhuongXa.Length > 0)
                {
                    param = new SqlParameter("@MaPhuongXa", PhuongXa);
                    where += " AND MaPhuongXa=@MaPhuongXa";
                    list.Add(param);
                }
                string query = "SELECT OBJECTID,DuongKinh,ToaDoX,ToaDoY,LoaiHoGa,LuuLuong,VanToc,DoSau,ChieuCao,VatLieu,NgayCapNhat,NguoiCapNhat,DonViQuanLy,DonViCapNhat,HinhAnh,GhiChu,MaDoiTuong,MaPhuongXa,MaQuanHuyen,GiaiDoanQuyhoach,CaoDoTKDinhCong,CaoDoTKTuNhien,CaoDoTKDayCong,TenHoGa ";
                query += " FROM HIENTRANG_HOGA " + where;
                List<HIENTRANG_HOGA> listResult = this.gisRepository.HIENTRANG_HOGA(query, list);
                return new LargeJsonResult { Data = listResult, JsonRequestBehavior = System.Web.Mvc.JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public LargeJsonResult getHIENTRANG_KHUVUCNGAP(string QuanHuyen, string PhuongXa)
        {
            try
            {
                ArrayList list = new ArrayList();
                SqlParameter param;
                string where = " WHERE 1=1";

                if (QuanHuyen.Length > 0)
                {
                    param = new SqlParameter("@MaQuanHuyen", QuanHuyen);
                    where += " AND MaQuanHuyen=@MaQuanHuyen";
                    list.Add(param);
                }
                if (PhuongXa.Length > 0)
                {
                    param = new SqlParameter("@MaPhuongXa", PhuongXa);
                    where += " AND MaPhuongXa=@MaPhuongXa";
                    list.Add(param);
                }
                string query = "SELECT OBJECTID,MaDoiTuong,TenKhuVuc,DienTich,NgayCapNhat,NguoiCapNhat,DonViCapNhat,DonViQuanLy,GhiChu,MaPhuongXa,MaQuanHuyen,GiaiDoanQuyHoach ";
                query += " FROM HIENTRANG_KHUVUCNGAP " + where;
                List<HIENTRANG_KHUVUCNGAP> listResult = this.gisRepository.HIENTRANG_KHUVUCNGAP(query, list);
                return new LargeJsonResult { Data = listResult, JsonRequestBehavior = System.Web.Mvc.JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public LargeJsonResult getHIENTRANG_LUUVUCTHOATNUOC(string DVQuanLy, string QuanHuyen, string PhuongXa)
        {
            try
            {
                ArrayList list = new ArrayList();
                SqlParameter param;
                string where = " WHERE 1=1";

                if (DVQuanLy.Length > 0)
                {
                    int dvql = int.Parse(DVQuanLy);
                    if (dvql > -1)
                    {
                        param = new SqlParameter("@DonViQuanLy", DVQuanLy);
                        where += " AND DonViQuanLy=@DonViQuanLy";
                        list.Add(param);
                    }
                }
                if (QuanHuyen.Length > 0)
                {
                    param = new SqlParameter("@MaQuanHuyen", QuanHuyen);
                    where += " AND MaQuanHuyen=@MaQuanHuyen";
                    list.Add(param);
                }
                if (PhuongXa.Length > 0)
                {
                    param = new SqlParameter("@MaPhuongXa", PhuongXa);
                    where += " AND MaPhuongXa=@MaPhuongXa";
                    list.Add(param);
                }
                string query = "SELECT OBJECTID,TenLuuVuc,CONVERT(VARCHAR,NgayCapNhat,103) as NgayCapNhat,NguoiCapNhat,DonViCapNhat,DonViQuanLy,GhiChu,DienTich,MaDoiTuong,MaPhuongXa,MaQuanHuyen,GiaiDoanQuyHoach ";
                query += " FROM HIENTRANG_LUUVUCTHOATNUOC " + where;
                List<HIENTRANG_LUUVUCTHOATNUOC> listResult = this.gisRepository.HIENTRANG_LUUVUCTHOATNUOC(query, list);
                return new LargeJsonResult { Data = listResult, JsonRequestBehavior = System.Web.Mvc.JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public LargeJsonResult getHIENTRANG_MIENGXA(string DVQuanLy, string QuanHuyen, string PhuongXa)
        {
            try
            {
                ArrayList list = new ArrayList();
                SqlParameter param;
                string where = " WHERE 1=1";

                if (DVQuanLy.Length > 0)
                {
                    int dvql = int.Parse(DVQuanLy);
                    if (dvql > -1)
                    {
                        param = new SqlParameter("@DonViQuanLy", DVQuanLy);
                        where += " AND DonViQuanLy=@DonViQuanLy";
                        list.Add(param);
                    }
                }
                if (QuanHuyen.Length > 0)
                {
                    param = new SqlParameter("@MaQuanHuyen", QuanHuyen);
                    where += " AND MaQuanHuyen=@MaQuanHuyen";
                    list.Add(param);
                }
                if (PhuongXa.Length > 0)
                {
                    param = new SqlParameter("@MaPhuongXa", PhuongXa);
                    where += " AND MaPhuongXa=@MaPhuongXa";
                    list.Add(param);
                }
                string query = "SELECT OBJECTID,ChieuDai,ToaDoX,ToaDoY,VatLieu,TinhTrang,NgayCapNhat,NguoiCapNhat,DonViQuanLy,DonViCapNhat,GhiChu,MaDoiTuong,MaPhuongXa,MaQuanHuyen,GiaiDoanQuyHoach ";
                query += " FROM HIENTRANG_MIENGXA " + where;
                List<HIENTRANG_MIENGXA> listResult = this.gisRepository.HIENTRANG_MIENGXA(query, list);
                return new LargeJsonResult { Data = listResult, JsonRequestBehavior = System.Web.Mvc.JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public LargeJsonResult getHIENTRANG_MOINOITHOATNUOC(string DVQuanLy, string QuanHuyen, string PhuongXa)
        {
            try
            {
                ArrayList list = new ArrayList();
                SqlParameter param;
                string where = " WHERE 1=1";

                if (DVQuanLy.Length > 0)
                {
                    int dvql = int.Parse(DVQuanLy);
                    if (dvql > -1)
                    {
                        param = new SqlParameter("@DonViQuanLy", DVQuanLy);
                        where += " AND DonViQuanLy=@DonViQuanLy";
                        list.Add(param);
                    }
                }
                if (QuanHuyen.Length > 0)
                {
                    param = new SqlParameter("@MaQuanHuyen", QuanHuyen);
                    where += " AND MaQuanHuyen=@MaQuanHuyen";
                    list.Add(param);
                }
                if (PhuongXa.Length > 0)
                {
                    param = new SqlParameter("@MaPhuongXa", PhuongXa);
                    where += " AND MaPhuongXa=@MaPhuongXa";
                    list.Add(param);
                }
                string query = "SELECT OBJECTID,DoSau,VatLieu,NgayCapNhat,NguoiCapNhat,DonViCapNhat,DonViQuanLy,GiaiDoanQuyHoach,DuongKinh,MaDoiTuong,MaPhuongXa,MaQuanHuyen,GhiChu ";
                query += " FROM HIENTRANG_MOINOITHOATNUOC " + where;
                List<HIENTRANG_MOINOITHOATNUOC> listResult = this.gisRepository.HIENTRANG_MOINOITHOATNUOC(query, list);
                return new LargeJsonResult { Data = listResult, JsonRequestBehavior = System.Web.Mvc.JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public LargeJsonResult getHIENTRANG_TRAMBOM(string DVQuanLy, string QuanHuyen, string PhuongXa)
        {
            try
            {
                ArrayList list = new ArrayList();
                SqlParameter param;
                string where = " WHERE 1=1";

                if (DVQuanLy.Length > 0)
                {
                    int dvql = int.Parse(DVQuanLy);
                    if (dvql > -1)
                    {
                        param = new SqlParameter("@DonViQuanLy", DVQuanLy);
                        where += " AND DonViQuanLy=@DonViQuanLy";
                        list.Add(param);
                    }
                }
                if (QuanHuyen.Length > 0)
                {
                    param = new SqlParameter("@MaQuanHuyen", QuanHuyen);
                    where += " AND MaQuanHuyen=@MaQuanHuyen";
                    list.Add(param);
                }
                if (PhuongXa.Length > 0)
                {
                    param = new SqlParameter("@MaPhuongXa", PhuongXa);
                    where += " AND MaPhuongXa=@MaPhuongXa";
                    list.Add(param);
                }
                string query = "SELECT OBJECTID,TenTram,CongSuat,TinhTrangTramBom,NgayCapNhat,NguoiCapNhat,DonViCapNhat,DonViQuanLy,HinhAnh,ToaDoX,ToaDoY,MaDoiTuong,MaPhuongXa,MaQuanHuyen,GiaiDoanQuyHoach,GhiChu ";
                query += " FROM HIENTRANG_TRAMBOM " + where;
                List<HIENTRANG_TRAMBOM> listResult = this.gisRepository.HIENTRANG_TRAMBOM(query, list);
                return new LargeJsonResult { Data = listResult, JsonRequestBehavior = System.Web.Mvc.JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public LargeJsonResult getHIENTRANG_TRAMXLNT(string DVQuanLy, string QuanHuyen, string PhuongXa)
        {
            try
            {
                ArrayList list = new ArrayList();
                SqlParameter param;
                string where = " WHERE 1=1";

                if (DVQuanLy.Length > 0)
                {
                    int dvql = int.Parse(DVQuanLy);
                    if (dvql > -1)
                    {
                        param = new SqlParameter("@DonViQuanLy", DVQuanLy);
                        where += " AND DonViQuanLy=@DonViQuanLy";
                        list.Add(param);
                    }
                }
                if (QuanHuyen.Length > 0)
                {
                    param = new SqlParameter("@MaQuanHuyen", QuanHuyen);
                    where += " AND MaQuanHuyen=@MaQuanHuyen";
                    list.Add(param);
                }
                if (PhuongXa.Length > 0)
                {
                    param = new SqlParameter("@MaPhuongXa", PhuongXa);
                    where += " AND MaPhuongXa=@MaPhuongXa";
                    list.Add(param);
                }
                string query = "SELECT OBJECTID,TenNhaMay,CongSuatXuLy,DonViQuanLy,PhamViXuLy,DienTich,NgayCapNhat,NguoiCapNhat,DonViCapNhat,GhiChu,MaDoiTuong,MaPhuongXa,MaQuanHuyen,GiaiDoanQuyHoach,CongSuatDuKien ";
                query += " FROM HIENTRANG_TRAMXLNT " + where;
                List<HIENTRANG_TRAMXLNT> listResult = this.gisRepository.HIENTRANG_TRAMXLNT(query, list);
                return new LargeJsonResult { Data = listResult, JsonRequestBehavior = System.Web.Mvc.JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return null;
            }
        }




        ///// end class   //////

    }
}