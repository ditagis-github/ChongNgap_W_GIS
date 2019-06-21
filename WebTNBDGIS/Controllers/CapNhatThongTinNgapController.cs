using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebTNBDGIS.Controllers
{
    [Authorize]
    public class CapNhatThongTinNgapController : Controller
    {
        // GET: CapNhatThongTinNgap
        public ActionResult Index()
        {
            return View();
        }
    }
}