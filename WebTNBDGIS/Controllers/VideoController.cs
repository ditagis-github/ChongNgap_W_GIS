using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebTNBDGIS.Models;

namespace WebTNBDGIS.Controllers
{
    [Authorize]
    public class VideosController : Controller
    {
        private ChongNgapBDModels context = new ChongNgapBDModels();
        // GET: Videos
        public ActionResult Index()
        {
            var list = context.Videos.ToList().OrderBy(video => video.ID);
            return View(list);
        }
    }
}