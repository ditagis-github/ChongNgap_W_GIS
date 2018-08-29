using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebTNBDGIS.Areas.Admin.Controllers
{
     [Authorize]
    public class AdminHomeController : Controller
    {
        //
        // GET: /Admin/AdminHome/

        public ActionResult Index()
        {
            return View();
        }
         
        public ActionResult QuanTri()
        {
            return View();
        }

    }
}
