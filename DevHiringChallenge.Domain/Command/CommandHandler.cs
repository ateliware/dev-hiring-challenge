using DevHiringChallenge.Domain.Interfaces;

namespace DevHiringChallenge.Domain.Command
{
    public abstract class CommandHandler
    {
        private readonly IUnitOfWork _uow;

        protected CommandHandler(IUnitOfWork context)
        {
            _uow = context;
        }

        protected void BeginTransaction()
        {
            _uow.BeginTransaction();
        }

        protected void Commit()
        {
            _uow.Commit();
        }

        public void Dispose()
        {
            _uow.Dispose();
        }

        public void Rollback()
        {
            _uow.Rollback();
        }

        public CommandResult Sucesso(object data, string mensagem = "")
        {
            return new CommandResult(true, mensagem, data);
        }

        public CommandResult Falha(string mensagem = "")
        {
            return new CommandResult(false, mensagem, null);
        }
    }
}