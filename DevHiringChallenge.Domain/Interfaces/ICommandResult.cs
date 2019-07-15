namespace DevHiringChallenge.Domain.Interfaces
{
    public interface ICommandResult
    {
        bool Sucesso { get; set; }
        string Mensagem { get; set; }
        object Data { get; set; }
    }
}