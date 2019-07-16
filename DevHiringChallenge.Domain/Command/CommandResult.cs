using DevHiringChallenge.Domain.Interfaces;

namespace DevHiringChallenge.Domain.Command
{
    public class CommandResult : ICommandResult
    {
        public bool Sucesso { get; set; }
        public string Mensagem { get; set; }
        public object Data { get; set; }

        public CommandResult(bool sucesso, string mensagem, object data)
        {
            Sucesso = sucesso;
            Mensagem = mensagem;
            Data = data;
        }

        public static CommandResult ObterSucessoResult(object data)
            =>
                new CommandResult(true, "", data);

        public static CommandResult ObterFalhaResult(string mensagem = "")
            =>
                new CommandResult(false, mensagem, null);
    }
}