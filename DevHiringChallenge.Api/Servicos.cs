using DevHiringChallenge.IoC;
using Ninject;
using System;
using System.Data.SqlClient;
using DevHiringChallenge.AppService.GitHubs;

namespace DevHiringChallenge.Api
{
    public static class Servicos
    {

        private static SqlConnection _connectionString;
        public static StandardKernel KernelNinject { get; set; } = null;

        private static StandardKernel Kernel()
        {
            try
            {
                if (KernelNinject == null)
                {
                    var connection = _connectionString ?? new SqlConnection("");

                    KernelNinject = ConfigNinject.Registrar(connection);
                }

            }
            catch (Exception)
            {
                //
            }

            return KernelNinject;
        }

        public static void CarregarKernel(SqlConnection connectionString)
        {
            KernelNinject?.Dispose();
            KernelNinject = null;

            _connectionString = connectionString;

            Kernel();
        }

        public static GitHubAppService GitHub => (GitHubAppService)Kernel().Get(typeof(GitHubAppService));
    }
}