using AteliwareChallenge.Business;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace AteliwareChallenge.Data
{
    public class HelperSQL
    {
        #region Propriedades / Variáveis

        private SqlConnection connection;

        #endregion

        #region Construtores

        public HelperSQL()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["DBAC0001"].ConnectionString;
            this.connection = new SqlConnection(connectionString);
        }

        #endregion

        #region Métodos Públicos

        public void GravarRepository(Repository repo)
        {
            try
            {

                this.connection.Open();

                SqlCommand command = new SqlCommand("[dbo].[AC_GRAVAR_REPOSITORIO]", this.connection);

                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@JSON_REPO", SqlDbType.NVarChar)).Value = JsonConvert.SerializeObject(repo);
                command.Parameters.Add(new SqlParameter("@JSON_REPO_ORI", SqlDbType.NVarChar)).Value = repo.original.ToString();
                command.Parameters.Add(new SqlParameter("@JSON_OWNER_ORI", SqlDbType.NVarChar)).Value = repo.owner.original.ToString();
                command.ExecuteNonQuery();

                this.connection.Close();

            }
            catch (Exception)
            {
                this.connection.Close();
                throw;
            }
        }

        #endregion
    }
}