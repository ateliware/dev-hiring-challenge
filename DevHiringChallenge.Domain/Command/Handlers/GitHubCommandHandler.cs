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
                var git = new GitHub(command.Id, command.Node_Id, command.Name, command.Full_Name, command.Description, command.Pushed_At, command.Created_At, command.Updated_At, command.Owner, command.Html_Url, command.Language);

                var codigoOwner = Guid.NewGuid();

                _repository.GravarOwner(git.Owner, codigoOwner);

                _repository.Gravar(git, codigoOwner);

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