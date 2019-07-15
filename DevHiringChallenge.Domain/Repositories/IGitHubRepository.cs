using DevHiringChallenge.Domain.Entities;

namespace DevHiringChallenge.Domain.Repositories
{
    public interface IGitHubRepository
    {
        void GravarOwner(Owner owner);
        void Gravar(GitHub gitHub);
    }
}
