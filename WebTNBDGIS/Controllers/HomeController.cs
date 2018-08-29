using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using WebTNBDGIS.Models;

namespace WebTNBDGIS.Controllers
{
    public class HomeController : Controller
    {

        public HomeController()
        {
        }


        public ActionResult Index()
        {
            return View();
        }

        [Authorize]
        public ActionResult Map()
        {
            return View();
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index");
        }
    }
}