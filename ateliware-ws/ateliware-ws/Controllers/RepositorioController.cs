using Newtonsoft.Json;
using ateliware_ws.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Newtonsoft.Json.Serialization;
using ateliware_ws.Dados;
using System.Configuration;
using ateliware_ws.DAO;
using System.Web.Http.Cors;

namespace ateliware_ws.Controllers
{
    public class RepositorioController : ApiController
    {

        [EnableCors("*", "*", "*")]
        [RoutePrefix("api/repositorio")]
        public class RepositorioCController : ApiController
        {
            /// <summary>Retornar todos os repositorios contidos no Banco de dados em formato JSON</summary>
            // GET: api/repositorio]
            [HttpGet]
            [Route("Listar")]
            public IHttpActionResult Listar()
            {
                try
                {
                    ///Listar e montar JSON de consulta
                    RepositoryEntityDAO RepositoryDAO = new RepositoryEntityDAO();
                    var Repositorio = RepositoryDAO.Listar();
                    return Ok(Repositorio);

                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            }

            /// <summary>Buscar e gravar os repositorios da API do GitHub de acordo com as linguagens padroes</summary>
            // GET: api/repositorio]
            [HttpGet]
            [Route("Buscar")]
            public IHttpActionResult Buscar()
            {
                try
                {
                    ///Disparar API do GITHUB
                    List<Repositorio> Repositorio = DispararBuscaAPIGitHub();

                    ///Adicionar repositorios não existentes
                    RepositoryEntityDAO RepositoryDAO = new RepositoryEntityDAO();
                    if(RepositoryDAO.Adicionar(Repositorio))
                       Repositorio = RepositoryDAO.Listar();

                    return Ok(Repositorio);

                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            }

            public List<Repositorio> DispararBuscaAPIGitHub()
            {

                string[] Linguagens = ConfigurationManager.AppSettings["LINGUAGENS"].ToString().Split('|');
                List<Repositorio> Repositorio = new List<Repositorio>();

                ///Protocolo de segurança
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Ssl3;
                HttpClient cliente = new HttpClient();

                cliente.BaseAddress = new Uri(ConfigurationManager.AppSettings["URL_GITHUB"].ToString());
                cliente.DefaultRequestHeaders.UserAgent.Add(new System.Net.Http.Headers.ProductInfoHeaderValue("AppName", "1.0"));
                cliente.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                cliente.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Token", ConfigurationManager.AppSettings["TOKEN_GITHUB"].ToString());

                ///Requisiçao para retornar todos os repositorios
                var response = cliente.GetAsync("/repositories");
                var resultado = response.Result.Content.ReadAsStringAsync().Result;
                
                response.Dispose();

                ///Montar Entidades de acordo com o JSON de retorno
                JsonSerializerSettings serSettings = new JsonSerializerSettings();
                serSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                var RepositorioAuxiliar = JsonConvert.DeserializeObject<List<Repositorio>>(resultado, serSettings);

                ///Buscar por linguagens dentro de cada repositorio
                RepositorioAuxiliar.ForEach(v_Object => {
                    HttpClient linguagem = new HttpClient();
                    linguagem.BaseAddress = new Uri(v_Object.URL_LINGUAGEM);
                    linguagem.DefaultRequestHeaders.UserAgent.Add(new System.Net.Http.Headers.ProductInfoHeaderValue("AppName", "1.0"));
                    linguagem.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                    linguagem.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Token", ConfigurationManager.AppSettings["TOKEN_GITHUB"].ToString());
                    var response1   = linguagem.GetAsync("");
                    var resultado1  = response1.Result.Content.ReadAsStringAsync().Result;
                    v_Object.Linguagem = new List<Linguagem>();
                    v_Object.LOGIN = v_Object.Autor.LOGIN;
                    v_Object.LINK_FOTO = v_Object.Autor.LINK_FOTO;
                    bool Cadastrar = false;

                    foreach(string L in Linguagens)
                    {
                        if (resultado1.ToUpper().IndexOf(L.ToUpper()) > 0) {
                            Cadastrar = true;
                            
                            Linguagem Linguagem = new Linguagem();
                            Linguagem.NOME_LINGUAGEM = L.ToUpper();
                            v_Object.Linguagem.Add(Linguagem);
                        }
                    }

                    if (Cadastrar)
                    {
                        Repositorio.Add(v_Object);
                    }
                });

                return Repositorio;
            }

        }
    }
    
}
