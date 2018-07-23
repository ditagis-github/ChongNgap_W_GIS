using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebTNBDGIS.Areas.Admin.Controllers
{
    public class AdminHomeController : Controller
    {
        // GET: Admin/AdminHome
        public ActionResult Index()
        {


            if(Request.IsAuthenticated == false)
            {
               return RedirectToAction("Login", "AdminAccount");
            }

            return View();
        }
    }
}