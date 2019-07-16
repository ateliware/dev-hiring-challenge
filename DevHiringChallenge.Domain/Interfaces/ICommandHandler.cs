namespace DevHiringChallenge.Domain.Interfaces
{
    public interface ICommandHandler<in T>
    {
        ICommandResult Handle(T command);
    }
}
