using ApiGitHubCore.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiGitHubCore.Models
{
    public class UserM
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public void recordName()
        {
            string sql = $"INSERT INTO USER(USERNAME, NAME) VALUES('{Name}','null')";
            DAL objDAL = new DAL();
            objDAL.ExecutarComandoSql(sql);
        }
    }
}
