using DevHiringChallenge.Domain.GitHubs.Entities;
using DevHiringChallenge.Domain.GitHubs.Repositories;
using DevHiringChallenge.Infrastructure.DataContexts;
using System;

namespace DevHiringChallenge.Infrastructure.Repositories.GitHubs
{
    public class GitHubRepository : IGitHubRepository
    {
        private readonly DataContext _context;

        public GitHubRepository(DataContext context) 
            => _context = context;

        public void Eliminar()
        {
            throw new NotImplementedException();
        }

        public void Gravar(GitHub gitHub)
        {
            throw new NotImplementedException();
        }
    }
}
