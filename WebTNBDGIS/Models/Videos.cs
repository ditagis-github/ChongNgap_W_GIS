using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebTNBDGIS.Models
{

    public class userVideo
    {
        public IEnumerable<Videos> videos { get; set; }
        public PagingInfo PagingInfo { get; set; }
    }


    public interface IVideosRepository
    {
        IQueryable<Videos> Videos { get; }
        string saveVideo(Videos video);
        string deleteVideo(int id);
        IEnumerable<Videos> getTopNewVideos();
    }
    public class EFVideosRepository : IVideosRepository
    {
        private GISDataContext context = new GISDataContext();

        public IQueryable<Videos> Videos
        {
            get { return context.Videos; }
        }
        public string saveVideo(Videos video)
        {
            if (video.id == 0)
            {
                context.Videos.Add(video);
            }
            else
            {
                Videos dbEntry = context.Videos.Find(video.id);
                if (dbEntry != null)
                {
                    dbEntry.link = video.link;
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
            Videos Video = context.Videos.Find(id);
            string result = "";
            if (Video != null)
            {
                try
                {
                    context.Videos.Remove(Video);
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    result = ex.Message;
                }
            }
            return result;
        }

        public IEnumerable<Videos> getTopNewVideos()
        {
            string query;
            List<Videos> videoResult = null;
            query = " SELECT id,link,mota ";
            query += " FROM Videos  ";
            query += " ORDER BY id DESC";

            videoResult = context.Database.SqlQuery<Videos>(query).ToList();
            return videoResult;
        }
    }

    [Table("Videos")]
    public class Videos
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }//int identity(1,1) ,

        [StringLength(1000, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 10)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Link youtube")]
        public string link { get; set; }// nvarchar(1000) not null ,

        [StringLength(1000, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 10)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [DataType(DataType.MultilineText)]
        [Display(Name = "Mô tả")]
        public string mota { get; set; }// nvarchar(1000) not null ,
    }
}