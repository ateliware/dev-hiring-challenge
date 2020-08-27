using Autofac;
using githubproj.Infrastructure.Repository.Implementation;
using githubproj.Infrastructure.Repository.Interface;
using githubproj.Services.Implementation;
using githubproj.Services.Interface;

namespace githubproj.IoC
{
    public class ConfigurationIOC
    {
        public static void Load(ContainerBuilder builder)
        {
            //IoC Service
            builder.RegisterType<APIService>().As<IAPIService>();
            builder.RegisterType<RepoService>().As<IRepoService>();

            //IoC Sql
            builder.RegisterType<RepoRepository>().As<IRepoRepository>();
            builder.RegisterType<OwnerRepository>().As<IOwnerRepository>();


        }
    }
}
