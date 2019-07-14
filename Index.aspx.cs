using AteliwareChallenge.Business;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Services;

namespace AteliwareChallenge
{
    public partial class Index : System.Web.UI.Page
    {
        #region Propriedades / Variáveis

        private const string urlSearch = "search/repositories?q=language:{0}&sort=stars&order=desc";

        #endregion

        #region Eventos da Página

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #endregion

        #region Métodos WEB

        [WebMethod]
        public static string ConsultarRepos(string language, int qtd)
        {
            try
            {
                string url = String.Format(urlSearch, language);
                HttpResponseMessage resposta = Utilities.RequestGET(url);
                JObject jdata = JsonConvert.DeserializeObject<JObject>(Utilities.RetornarContentResponse(resposta));

                List<Repository> listaRepos = RetornarRepos(jdata, qtd);
                if (listaRepos.Count > 0)
                {
                    Task.Run(() => Repository.RegistrarLista(listaRepos));
                    return JsonConvert.SerializeObject(listaRepos);
                }

                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }

        #endregion

        #region Métodos Privados

        private static List<Repository> RetornarRepos(JObject jdata, int qtd)
        {
            try
            {
                List<Repository> repos = new List<Repository>();

                int count = 0;
                foreach (JObject repo in jdata["items"])
                {
                    if (count >= qtd) break;

                    repos.Add(new Repository(repo));
                    count++;                    
                }

                return repos;
            }
            catch (Exception)
            {
                throw;
            }            
        }

        #endregion
    }
}