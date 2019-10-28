using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace ApiGitHubCore.Context
{
    public class DAL
    {
        public static string server = "localhost";
        public static string database = "apidb";
        public static string user = "root";
        public static string password = "";
        public static string connectionString = $"Server={server};Database={database};Uid={user};Pwd={password}";
        private MySqlConnection connection;

        //método construtor para conexão automática
        public DAL()
        {
            connection = new MySqlConnection(connectionString);
            connection.Open();
        }

        //retornar um dado baseado em uma consulta SQL que for enviado
        public DataTable ReDataTable(string sql)
        {
            DataTable dataTable = new DataTable();
            MySqlCommand command = new MySqlCommand(sql, connection);
            MySqlDataAdapter adap = new MySqlDataAdapter(command);
            adap.Fill(dataTable);
            return dataTable;
        }

        //executar Inserts, Updates e Deletes
        public void ExecutarComandoSql(string sql)
        {
            MySqlCommand command = new MySqlCommand(sql, connection);
            command.ExecuteNonQuery();
        }
    }
}
