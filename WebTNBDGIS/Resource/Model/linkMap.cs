using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using WebTNBDGIS.Models;

namespace WebTNBDGIS.Resource.Model
{


    public class userlinkMap
    {
        public IEnumerable<linkMap> linkMap { get; set; }
        public PagingInfo PagingInfo { get; set; }
    }


    public interface IlinkMapRepository
    {
        IQueryable<linkMap> linkMap { get; }
        string saveVideo(linkMap video);
        string deleteVideo(int id);
        IEnumerable<linkMap> getTopNewlinkMap();
    }
    public class EFlinkMapRepository : IlinkMapRepository
    {
        private DBContextRainfall context = new DBContextRainfall();

        public IQueryable<linkMap> linkMap
        {
            get { return context.linkMaps; }
        }
        public string saveVideo(linkMap video)
        {
            if (video.id == 0)
            {
                context.linkMaps.Add(video);
            }
            else
            {
                linkMap dbEntry = context.linkMaps.Find(video.id);
                if (dbEntry != null)
                {
                    dbEntry.link = video.link;
                    dbEntry.typeMap = video.typeMap;
                    dbEntry.mota = video.mota;
                }
            }
            try
            {
                context.SaveChanges();
                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string deleteVideo(int id)
        {
            linkMap Video = context.linkMaps.Find(id);
            string result = "";
            if (Video != null)
            {
                try
                {
                    context.linkMaps.Remove(Video);
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    result = ex.Message;
                }
            }
            return result;
        }

        public IEnumerable<linkMap> getTopNewlinkMap()
        {
            string query;
            List<linkMap> videoResult = null;
            query = " SELECT id,link,mota,typeMap ";
            query += " FROM linkMap  ";
            query += " ORDER BY id DESC";

            videoResult = context.Database.SqlQuery<linkMap>(query).ToList();
            return videoResult;
        }
    }

    [Table("linkMap")]
    public class linkMap
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }//int identity(1,1) ,

        [StringLength(1000, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 10)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Link bản đồ")]
        public string link { get; set; }// nvarchar(1000) not null ,

        [StringLength(1000, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 10)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [DataType(DataType.MultilineText)]
        [Display(Name = "Mô tả")]
        public string mota { get; set; }// nvarchar(1000) not null ,

        [Display(Name = "Loại bản đồ")]
        public string typeMap { get; set; }

    }

}