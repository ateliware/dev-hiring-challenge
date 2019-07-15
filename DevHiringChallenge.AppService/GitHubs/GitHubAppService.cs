using DevHiringChallenge.AppService.Interface;
using DevHiringChallenge.Domain.Command.Handlers;
using DevHiringChallenge.Domain.Command.Inputs;
using DevHiringChallenge.Domain.Entities;
using DevHiringChallenge.Domain.Interfaces;
using DevHiringChallenge.Domain.Repositories;
using Newtonsoft.Json;
using prmToolkit.NotificationPattern;
using RestSharp;
using System;
using DevHiringChallenge.Domain.Results;

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
                    Following_Url = item.Following_Url,
                    Description = item.Description,
                    Starred_Url = item.Starred_Url,
                    Fork = item.Fork,
                    Pushed_At = item.Pushed_At,
                    Subscriptions_Url = item.Subscriptions_Url,
                    Created_At = item.Created_At,
                    Avatar_Url = item.Avatar_Url,
                    Branches_Url = item.Branches_Url,
                    Browser_Download_Url = item.Browser_Download_Url,
                    Content_Type = item.Content_Type,
                    Events_Url = item.Events_Url,
                    Followers_Url = item.Followers_Url,
                    Gists_Url = item.Gists_Url,
                    Html_Url = item.Html_Url,
                    Id = item.Id,
                    Label = item.Label,
                    Name = item.Name,
                    Node_Id = item.Node_Id,
                    Organizations_Url = item.Organizations_Url,
                    Received_Events_Url = item.Received_Events_Url,
                    Repos_Url = item.Repos_Url,
                    Size = item.Size,
                    State = item.State,
                    Updated_At = item.Updated_At,
                    Url = item.Url,
                    Owner = new Owner(item.Owner.Login, item.Owner.Id, item.Owner.Node_Id, item.Owner.Avatar_Url,
                        item.Owner.Gravatar_Id, item.Owner.Type, item.Owner.Site_Admin, item.Owner.Url,
                        item.Owner.Html_Url, item.Owner.Followers_Url, item.Owner.Following_Url, item.Owner.Gists_Url,
                        item.Owner.Starred_Url, item.Owner.Subscriptions_Url, item.Owner.Organizations_Url,
                        item.Owner.Repos_Url, item.Owner.Events_Url, item.Owner.Received_Events_Url)
                };

                Gravar(command);
            }
        }

        private ICommandResult Gravar(CriarGitHubCommand command)
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