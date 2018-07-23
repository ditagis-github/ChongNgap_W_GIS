﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebTNBDGIS.Models;

namespace WebTNBDGIS.Areas.Admin.Models
{
    public class AdminGroupUserModel
    {
        public IEnumerable<GroupUser> groupUser { get; set; }
        public PagingInfo PagingInfo { get; set; }
        public int? fillterID { get; set; }
        public string strSearch { get; set; }
        public int? sort { get; set; }
        public bool isAsc { get; set; }
    }
}