using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebTNBDGIS.Controllers
{
    [Authorize]
    public class BanDoNgapController : Controller
    {
        // GET: BanDoNgap
        public ActionResult Index()
        {
            return View();
        }
    }
}