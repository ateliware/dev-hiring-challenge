using AteliwareChallenge.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AteliwareChallenge.Business
{
    public class Repository
    {
        #region Propriedades / Variáveis

        [JsonIgnore] public JObject original;

        public int id;
        public string name;
        public string full_name;
        public Uri html_url;
        public string description;
        public int stargazers_count;
        public Owner owner;
        public string created_at;
        public string updated_at;
        public string pushed_at;
        public int forks;
        public int open_issues;

        #endregion

        #region Construtores

        private Repository() { }

        public Repository(JObject repositorio)
        {
            this.original = repositorio;
            this.id = (int)original["id"];
            this.name = (string)original["name"];
            this.full_name = (string)original["full_name"];
            this.html_url = new Uri((string)original["html_url"]);
            this.description = (string)original["description"];
            this.stargazers_count = (int)original["stargazers_count"];
            this.owner = new Owner((JObject)original["owner"]);
            this.created_at = ((DateTime)original["created_at"]).ToString("dd/MM/yyyy hh:mm:ss");
            this.updated_at = ((DateTime)original["updated_at"]).ToString("dd/MM/yyyy hh:mm:ss");
            this.pushed_at = ((DateTime)original["pushed_at"]).ToString("dd/MM/yyyy hh:mm:ss");
            this.forks = (int)original["forks"];
            this.open_issues = (int)original["open_issues"];
        }

        #endregion

        #region Métodos Públicos        

        public static void RegistrarLista(List<Repository> listaRepos)
        {
            foreach (Repository repo in listaRepos)
            {
                repo.Registrar();
            }
        }

        #endregion

        #region Métodos Privados

        private void Registrar()
        {
            HelperSQL help = new HelperSQL();
            help.GravarRepository(this);
        }

        #endregion
    }
}