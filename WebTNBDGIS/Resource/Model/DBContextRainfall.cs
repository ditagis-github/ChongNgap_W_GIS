namespace WebTNBDGIS.Resource.Model
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using Models;

    public partial class DBContextRainfall : DbContext
    {
        public DBContextRainfall()
            : base("name=DBContextRainfall")
        {
        }
        public DbSet<linkMap> linkMaps { get; set; }

        public virtual DbSet<Binhchanh> Binhchanhs { get; set; }
        public virtual DbSet<Cuchi> Cuchis { get; set; }
        public virtual DbSet<Hocmon> Hocmons { get; set; }
        public virtual DbSet<Nhabe> Nhabes { get; set; }
        public virtual DbSet<Tansonhoa> Tansonhoas { get; set; }
        public virtual DbSet<Macdinhchi> Macdinhchis { get; set; }

        public DbSet<Users> Users { get; set; }
        public DbSet<GroupUser> GroupUsers { get; set; }
        public DbSet<UserInGroup> UserInGroups { get; set; }
        public DbSet<GroupRole> GroupRoles { get; set; }


        // mực nước
        public virtual DbSet<Ben_Luc> Ben_Luc { get; set; }
        public virtual DbSet<Bien_Hoa> Bien_Hoa { get; set; }
        public virtual DbSet<Nha_Be> Nha_Be { get; set; }
        public virtual DbSet<Phu_An> Phu_An { get; set; }
        public virtual DbSet<Tan_An> Tan_An { get; set; }
        public virtual DbSet<TD_Mot> TD_Mot { get; set; }
        public virtual DbSet<Vung_Tau> Vung_Tau { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
