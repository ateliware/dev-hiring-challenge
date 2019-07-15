using DevHiringChallenge.Domain.Entities;

namespace DevHiringChallenge.Domain.Repositories
{
    public interface IGitHubRepository
    {
        void Gravar(GitHub gitHub);
    }
}
