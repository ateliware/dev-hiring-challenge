using DevHiringChallenge.Domain.Command.Inputs;
using DevHiringChallenge.Domain.Entities;
using DevHiringChallenge.Domain.Interfaces;
using DevHiringChallenge.Domain.Repositories;
using System;

namespace DevHiringChallenge.Domain.Command.Handlers
{
    public class GitHubCommandHandler : CommandHandler, ICommandHandler<CriarGitHubCommand>
    {
        private readonly IGitHubRepository _repository;

        public GitHubCommandHandler(IGitHubRepository repository, IUnitOfWork uow) : base(uow)
        {
            _repository = repository;
        }

        public ICommandResult Handle(CriarGitHubCommand command)
        {
            CommandResult retorno;

            try
            {
                var git = new GitHub(command.Id, command.Node_Id, command.Name, command.Full_Name, command.Description, command.Fork, command.Pushed_At, command.Created_At, command.Updated_At, command.Size, command.Content_Type, command.State, command.Label, command.Owner, command.Html_Url, command.Url, command.Followers_Url, command.Following_Url, command.Gists_Url, command.Starred_Url, command.Subscriptions_Url, command.Organizations_Url, command.Repos_Url, command.Events_Url, command.Avatar_Url, command.Branches_Url, command.Browser_Download_Url, command.Received_Events_Url);

                _repository.GravarOwner(git.Owner);

                _repository.Gravar(git);

                retorno = Sucesso(null);
            }
            catch (Exception ex)
            {
                retorno = Falha(ex.Message);
            }

            return retorno;
        }
    }
}