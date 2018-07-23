namespace WebTNBDGIS.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.Web.Mvc;
    using Ninject;
    using System.Web.Routing;
    using System.Collections;
    using System.Collections.Generic;

    public interface IGISRepository
    {
        List<HIENTRANG_BECHUA> HIENTRANG_BECHUA(string query, ArrayList list);
        List<HIENTRANG_CONGTHOATNUOC> HIENTRANG_CONGTHOATNUOC(string query, ArrayList list);
        List<HIENTRANG_GIENG> HIENTRANG_GIENG(string query, ArrayList list);
        List<HIENTRANG_HOGA> HIENTRANG_HOGA(string query, ArrayList list);
        List<HIENTRANG_KHUVUCNGAP> HIENTRANG_KHUVUCNGAP(string query, ArrayList list);
        List<HIENTRANG_LUUVUCTHOATNUOC> HIENTRANG_LUUVUCTHOATNUOC(string query, ArrayList list);
        List<HIENTRANG_MIENGXA> HIENTRANG_MIENGXA(string query, ArrayList list);
        List<HIENTRANG_MOINOITHOATNUOC> HIENTRANG_MOINOITHOATNUOC(string query, ArrayList list);
        List<HIENTRANG_TRAMBOM> HIENTRANG_TRAMBOM(string query, ArrayList list);
        List<HIENTRANG_TRAMXLNT> HIENTRANG_TRAMXLNT(string query, ArrayList list);
    }
    public class EFGISRepository : IGISRepository
    {
        private GISDataContext context = new GISDataContext();

        public List<HIENTRANG_BECHUA> HIENTRANG_BECHUA(string query, ArrayList list)
        {
            List<HIENTRANG_BECHUA> result = null;

            context.Database.CommandTimeout = 180;
            if (list != null)
            {
                result = context.Database.SqlQuery<HIENTRANG_BECHUA>(query, list.ToArray()).ToList();
            }
            else
            {
                result = context.Database.SqlQuery<HIENTRANG_BECHUA>(query).ToList();
            }

            return result;
        }
        public List<HIENTRANG_CONGTHOATNUOC> HIENTRANG_CONGTHOATNUOC(string query, ArrayList list)
        {
            List<HIENTRANG_CONGTHOATNUOC> result = null;

            context.Database.CommandTimeout = 180;
            if (list != null)
            {
                result = context.Database.SqlQuery<HIENTRANG_CONGTHOATNUOC>(query, list.ToArray()).ToList();
            }
            else
            {
                result = context.Database.SqlQuery<HIENTRANG_CONGTHOATNUOC>(query).ToList();
            }

            return result;
        }
        public List<HIENTRANG_GIENG> HIENTRANG_GIENG(string query, ArrayList list)
        {
            List<HIENTRANG_GIENG> result = null;

            context.Database.CommandTimeout = 180;
            if (list != null)
            {
                result = context.Database.SqlQuery<HIENTRANG_GIENG>(query, list.ToArray()).ToList();
            }
            else
            {
                result = context.Database.SqlQuery<HIENTRANG_GIENG>(query).ToList();
            }

            return result;
        }
        public List<HIENTRANG_HOGA> HIENTRANG_HOGA(string query, ArrayList list)
        {
            List<HIENTRANG_HOGA> result = null;

            context.Database.CommandTimeout = 180;
            if (list != null)
            {
                result = context.Database.SqlQuery<HIENTRANG_HOGA>(query, list.ToArray()).ToList();
            }
            else
            {
                result = context.Database.SqlQuery<HIENTRANG_HOGA>(query).ToList();
            }

            return result;
        }
        public List<HIENTRANG_KHUVUCNGAP> HIENTRANG_KHUVUCNGAP(string query, ArrayList list)
        {
            List<HIENTRANG_KHUVUCNGAP> result = null;

            context.Database.CommandTimeout = 180;
            if (list != null)
            {
                result = context.Database.SqlQuery<HIENTRANG_KHUVUCNGAP>(query, list.ToArray()).ToList();
            }
            else
            {
                result = context.Database.SqlQuery<HIENTRANG_KHUVUCNGAP>(query).ToList();
            }

            return result;
        }
        public List<HIENTRANG_LUUVUCTHOATNUOC> HIENTRANG_LUUVUCTHOATNUOC(string query, ArrayList list)
        {
            List<HIENTRANG_LUUVUCTHOATNUOC> result = null;

            context.Database.CommandTimeout = 180;
            if (list != null)
            {
                result = context.Database.SqlQuery<HIENTRANG_LUUVUCTHOATNUOC>(query, list.ToArray()).ToList();
            }
            else
            {
                result = context.Database.SqlQuery<HIENTRANG_LUUVUCTHOATNUOC>(query).ToList();
            }

            return result;
        }
        public List<HIENTRANG_MIENGXA> HIENTRANG_MIENGXA(string query, ArrayList list)
        {
            List<HIENTRANG_MIENGXA> result = null;

            context.Database.CommandTimeout = 180;
            if (list != null)
            {
                result = context.Database.SqlQuery<HIENTRANG_MIENGXA>(query, list.ToArray()).ToList();
            }
            else
            {
                result = context.Database.SqlQuery<HIENTRANG_MIENGXA>(query).ToList();
            }

            return result;
        }
        public List<HIENTRANG_MOINOITHOATNUOC> HIENTRANG_MOINOITHOATNUOC(string query, ArrayList list)
        {
            List<HIENTRANG_MOINOITHOATNUOC> result = null;

            context.Database.CommandTimeout = 180;
            if (list != null)
            {
                result = context.Database.SqlQuery<HIENTRANG_MOINOITHOATNUOC>(query, list.ToArray()).ToList();
            }
            else
            {
                result = context.Database.SqlQuery<HIENTRANG_MOINOITHOATNUOC>(query).ToList();
            }

            return result;
        }
        public List<HIENTRANG_TRAMBOM> HIENTRANG_TRAMBOM(string query, ArrayList list)
        {
            List<HIENTRANG_TRAMBOM> result = null;

            context.Database.CommandTimeout = 180;
            if (list != null)
            {
                result = context.Database.SqlQuery<HIENTRANG_TRAMBOM>(query, list.ToArray()).ToList();
            }
            else
            {
                result = context.Database.SqlQuery<HIENTRANG_TRAMBOM>(query).ToList();
            }

            return result;
        }
        public List<HIENTRANG_TRAMXLNT> HIENTRANG_TRAMXLNT(string query, ArrayList list)
        {
            List<HIENTRANG_TRAMXLNT> result = null;

            context.Database.CommandTimeout = 180;
            if (list != null)
            {
                result = context.Database.SqlQuery<HIENTRANG_TRAMXLNT>(query, list.ToArray()).ToList();
            }
            else
            {
                result = context.Database.SqlQuery<HIENTRANG_TRAMXLNT>(query).ToList();
            }

            return result;
        }

    }

    public class NinjectControllerFactory : DefaultControllerFactory
    {
        private IKernel ninjectKernel;
        public NinjectControllerFactory()
        {
            ninjectKernel = new StandardKernel();
            AddBindings();
        }
        protected override IController GetControllerInstance(RequestContext
        requestContext, Type controllerType)
        {
            return controllerType == null
            ? null
            : (IController)ninjectKernel.Get(controllerType);
        }
        private void AddBindings()
        {
            ninjectKernel.Bind<IGISRepository>().To<EFGISRepository>();
            
            ninjectKernel.Bind<IUsersRepository>().To<EFUsersRepository>();
            ninjectKernel.Bind<IGroupUserRepository>().To<EFGroupUserRepository>();
            ninjectKernel.Bind<IUserInGroupRepository>().To<EFUserInGroupRepository>();
            ninjectKernel.Bind<IGroupRoleRepository>().To<EFGroupRoleRepository>();
            ninjectKernel.Bind<IVideosRepository>().To<EFVideosRepository>();

            //
        }
    }
        public partial class GISDataContext : DbContext
    {
        public GISDataContext()
            : base("name=GISDataContext")
        {
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<GroupUser> GroupUsers { get; set; }
        public DbSet<UserInGroup> UserInGroups { get; set; }
        public DbSet<GroupRole> GroupRoles { get; set; }
        public DbSet<Videos> Videos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            
        }
    }
}
