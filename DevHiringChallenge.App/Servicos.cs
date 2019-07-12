using DevHiringChallenge.IoC;
using Ninject;
using System;
using System.Data.SqlClient;

namespace DevHiringChallenge.App
{
    public static class Servicos
    {
        private static readonly string Connection = $@"Data Source=LOCALHOST;Initial Catalog=ATELIWARE;User ID=sa; pwd=s3nh4";
        public static StandardKernel KernelNinject { get; set; } = null;
        public static SqlConnectionStringBuilder ConnectionString;

        private static StandardKernel Kernel()
        {
            try
            {
                if (KernelNinject == null)
                {
                    var connection = ConnectionString ?? new SqlConnectionStringBuilder(Connection);

                    KernelNinject = ConfigNinject.Registrar(connection);
                }

            }
            catch (Exception ex)
            {
                //
            }

            return KernelNinject;
        }

        public static void CarregarKernel()
        {
            KernelNinject?.Dispose();

            KernelNinject = null;

            Kernel();
        }

        public static AppService.GitHubs.GitHubAppService GitHub
            => (AppService.GitHubs.GitHubAppService)Kernel().Get(typeof(AppService.GitHubs.GitHubAppService));
    }
}
