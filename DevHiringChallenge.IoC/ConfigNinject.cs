using DevHiringChallenge.Domain.Repositories;
using DevHiringChallenge.Infra;
using DevHiringChallenge.Infra.DataContexts;
using DevHiringChallenge.Infra.UoW;
using Ninject;
using Ninject.Extensions.NamedScope;
using System.Data.SqlClient;
using DevHiringChallenge.Infra.Repositories;

namespace DevHiringChallenge.IoC
{
    public class ConfigNinject
    {
        public static StandardKernel Registrar(SqlConnection connection)
        {
            var kernel = new StandardKernel(new NinjectSettings { AllowNullInjection = true });

            kernel.Bind<SqlConnection>().ToConstant(connection);
            kernel.Bind<DataContext>().ToSelf().InCallScope();
            kernel.Bind<IUnitOfWork>().To<UnitOfWork>();

            kernel.Bind<IGitHubRepository>().To<GitHubRepository>();

            return kernel;
        }
    }
}