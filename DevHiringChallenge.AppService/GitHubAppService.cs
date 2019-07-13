using DevHiringChallenge.Domain.Entities;
using DevHiringChallenge.Domain.Repositories;
using System.Collections.Generic;

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