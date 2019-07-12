using DevHiringChallenge.Infrastructure.DataContexts;
using Ninject;
using System.Data.SqlClient;
using DevHiringChallenge.Domain.GitHubs.Repositories;
using DevHiringChallenge.Domain.Interfaces;
using DevHiringChallenge.Infrastructure.Repositories.GitHubs;
using DevHiringChallenge.Infrastructure.UoW;
using Ninject.Extensions.NamedScope;

namespace DevHiringChallenge.IoC
{
    public class ConfigNinject
    {
        public static StandardKernel Registrar(SqlConnectionStringBuilder connection)
        {
            var kernel = new StandardKernel(new NinjectSettings { AllowNullInjection = true });

            kernel.Bind<SqlConnectionStringBuilder>().ToConstant(connection);
            kernel.Bind<DataContext>().ToSelf().InCallScope();
            kernel.Bind<IUnitOfWork>().To<UnitOfWork>();

            kernel.Bind<IGitHubRepository>().To<GitHubRepository>();

            return kernel;
        }
    }
}