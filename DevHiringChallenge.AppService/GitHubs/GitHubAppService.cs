using DevHiringChallenge.AppService.Interface;
using DevHiringChallenge.Domain.Command.Handlers;
using DevHiringChallenge.Domain.Command.Inputs;
using DevHiringChallenge.Domain.Entities;
using DevHiringChallenge.Domain.Repositories;
using DevHiringChallenge.Domain.Results;
using Newtonsoft.Json;
using prmToolkit.NotificationPattern;
using RestSharp;
using System;

namespace DevHiringChallenge.AppService.GitHubs
{
    public class GitHubAppService : Notifiable, IServiceGitHub
    {
        private readonly IGitHubRepository _repository;
        private readonly GitHubCommandHandler _handler;

        public GitHubAppService(IGitHubRepository repository, GitHubCommandHandler handler)
        {
            _repository = repository;
            _handler = handler;
        }

        public void Gravar(GitHubResponseResult gitHub)
        {
            foreach (var item in gitHub.Items)
            {
                var command = new CriarGitHubCommand()
                {
                    Full_Name = item.Full_Name,
                    Description = item.Description,
                    Pushed_At = item.Pushed_At,
                    Created_At = item.Created_At,
                    Html_Url = item.Html_Url,
                    Id = item.Id,
                    Name = item.Name,
                    Node_Id = item.Node_Id,
                    Updated_At = item.Updated_At,
                    Language =  item.Language,
                    Owner = new Owner(item.Owner.Login, item.Owner.Id, item.Owner.Node_Id, item.Owner.Avatar_Url,
                        item.Owner.Gravatar_Id, item.Owner.Type, item.Owner.Url)
                };

                Gravar(command);
            }
        }

        private void Gravar(CriarGitHubCommand command)
                => _handler.Handle(command);

        public ApiReply RequisicaoHttp(string url, string parametros, string contentType)
        {
            var resposta = new ApiReply();

            try
            {
                System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;

                var cliente = new RestClient(url);

                var requisicao = new RestRequest(Method.GET)
                {
                    RequestFormat = DataFormat.Json
                };

                requisicao.AddHeader("Content-Type", contentType);
                requisicao.Parameters.Clear();

                requisicao.AddParameter(contentType, JsonConvert.SerializeObject(parametros), ParameterType.RequestBody);

                var retornoApi = cliente.Execute(requisicao);
                resposta.Data = retornoApi.Content;
                resposta.StatusCode = (int)retornoApi.StatusCode;

                resposta.Sucesso = (resposta.StatusCode >= 200 && resposta.StatusCode < 210);
            }
            catch (Exception ex)
            {
                resposta.Mensagem = $"Erro na requisição: {ex.Message}";
            }

            return resposta;
        }
    }
}