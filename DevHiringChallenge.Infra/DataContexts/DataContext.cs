using System.Data;
using System.Data.SqlClient;

namespace DevHiringChallenge.Infra.DataContexts
{
    public class DataContext
    {
        private string SqlConnectionString { get; set; }
        private SqlConnection SqlConnection { get; set; }
        public SqlTransaction Transaction { get; private set; }

        public DataContext(SqlConnection connectionString)
            => SqlConnectionString = connectionString.ConnectionString;

        public SqlConnection Connection
            => SqlConnection ?? (SqlConnection = new SqlConnection(SqlConnectionString));

        private void OpenConnection()
        {
            if (Connection.State != ConnectionState.Open)
                SqlConnection.Open();
        }

        public void BeginTransaction()
        {
            if (Transaction != null) return;

            OpenConnection();
            Transaction = Connection.BeginTransaction();
        }

        public void Commit()
        {
            if (Transaction != null)
            {
                Transaction.Commit();
                Transaction.Dispose();
                Transaction = null;
            }

            Dispose();
        }

        public void Rollback()
        {
            if (Transaction != null)
            {
                Transaction.Rollback();
                Transaction = null;
            }

            Dispose();
        }

        public void Dispose()
        {
            if (SqlConnection != null && SqlConnection.State == ConnectionState.Open)
                SqlConnection.Close();
        }
    }
}