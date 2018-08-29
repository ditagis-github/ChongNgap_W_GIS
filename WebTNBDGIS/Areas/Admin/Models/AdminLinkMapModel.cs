using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebTNBDGIS.Models;
using WebTNBDGIS.Resource.Model;

namespace WebTNBDGIS.Areas.Admin.Models
{
    public class AdminLinkMapModel
    {
        public IEnumerable<linkMap> linkMaps { get; set; }
        public PagingInfo PagingInfo { get; set; }
        public string strSearch { get; set; }
        public int? sort { get; set; }
        public bool isAsc { get; set; }
    }
}