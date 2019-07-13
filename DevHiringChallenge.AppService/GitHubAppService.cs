using DevHiringChallenge.Domain.Entities;
using System.Collections.Generic;
using DevHiringChallenge.Domain.Repositories;

namespace DevHiringChallenge.AppService
{
    public class GitHubAppService
    {
        private readonly IGitHubRepository _repository;

        public GitHubAppService(IGitHubRepository repository)
            => _repository = repository;

        public IEnumerable<GitHub> ObterRepositorios(string linguagem)
            => _repository.ObterRepositorios(linguagem);
    }
}