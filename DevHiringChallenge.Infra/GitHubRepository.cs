using DevHiringChallenge.Domain.Entities;
using DevHiringChallenge.Domain.Repositories;
using System;
using System.Collections.Generic;

namespace DevHiringChallenge.Infra
{
    public class GitHubRepository : IGitHubRepository
    {
        public void Gravar(GitHub gitHub)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<GitHub> ObterRepositorios(string linguagem)
        {
            throw new NotImplementedException();
        }
    }
}
