using DevHiringChallenge.Domain.Entities;
using System.Collections.Generic;

namespace DevHiringChallenge.Domain.Repositories
{
    public interface IGitHubRepository
    {
        void Gravar(GitHub gitHub);

        IEnumerable<GitHub> ObterRepositorios(string linguagem);
    }
}
