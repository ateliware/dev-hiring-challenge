using DevHiringChallenge.Api.Controllers.Base;
using DevHiringChallenge.AppService.Interface;
using DevHiringChallenge.Domain.Interfaces;
using DevHiringChallenge.Domain.Results;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace DevHiringChallenge.Api.Controllers
{
    [RoutePrefix("api/github")]
    public class GitHubController : ControllerBase
    {
        public HttpClient Client { get; }
        public IServiceGitHub ServiceGitHub { get; }

        public GitHubController()
        {
            var handler = new HttpClientHandler {UseDefaultCredentials = true};

            Client = new HttpClient(handler);
        }

        public GitHubController(IUnitOfWork unitOfWork, IServiceGitHub serviceGitHub) : base(unitOfWork)
        {
            ServiceGitHub = serviceGitHub;
        }

        [Route("obter")]
        [HttpGet]
        public async Task<HttpResponseMessage> ObterRepositoriosGitHub(string linguagem)
        {
            try
            {
                Client.BaseAddress = new Uri("https://api.github.com/");
                Client.DefaultRequestHeaders.Add("Accept", "application/vnd.github.v3+json");
                Client.DefaultRequestHeaders.Add("User-Agent", "HttpClientFactory-Sample");

                var url = $"search/repositories?q=stars:>=10000+language:{linguagem}&sort=stars&order=desc";

                var requisicao = Servicos.GitHub.RequisicaoHttp(Client.BaseAddress + url, "", "application/json");

                var resposta = (GitHubResponseResult)JsonConvert.DeserializeObject(Convert.ToString(requisicao.Data), typeof(GitHubResponseResult));

                Servicos.GitHub.Gravar(resposta);

                return await ResponseAsync(resposta);
            }
            catch (Exception ex)
            {
                return await ResponseExceptionAsync(ex);
            }
        }
    }
}