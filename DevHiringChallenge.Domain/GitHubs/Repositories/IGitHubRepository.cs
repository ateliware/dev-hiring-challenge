using DevHiringChallenge.Domain.GitHubs.Entities;

namespace DevHiringChallenge.Domain.GitHubs.Repositories
{
    public interface IGitHubRepository
    {
        void Gravar(GitHub gitHub);
        void Eliminar();
    }
}
