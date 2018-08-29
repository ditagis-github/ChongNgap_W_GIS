using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using WebTNBDGIS.Models;
using WebTNBDGIS.Resource.Model;

namespace WebTNBDGIS.Resource.Repository
{
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
            ninjectKernel.Bind<IEFDataRainfallRepository>().To<EFDataRainfallRepository>();
            ninjectKernel.Bind<IUsersRepository>().To<EFUsersRepository>();
            ninjectKernel.Bind<IGroupUserRepository>().To<EFGroupUserRepository>();
            ninjectKernel.Bind<IUserInGroupRepository>().To<EFUserInGroupRepository>();
            ninjectKernel.Bind<IGroupRoleRepository>().To<EFGroupRoleRepository>();
            ninjectKernel.Bind<IlinkMapRepository>().To<EFlinkMapRepository>();
        }
    }
}