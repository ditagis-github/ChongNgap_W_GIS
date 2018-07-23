using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace WebTNBDGIS
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

           // routes.MapRoute(
           //    "Admin_default",
           //    "Admin/{controller}/{action}/{id}",
           //    new { controller = "AdminHome", action = "Index", id = UrlParameter.Optional }
           //);

        }
    }
}
