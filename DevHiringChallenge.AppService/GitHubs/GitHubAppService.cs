using DevHiringChallenge.Domain.GitHubs.Repositories;

namespace DevHiringChallenge.AppService.GitHubs
{
    public class GitHubAppService
    {
        private readonly IGitHubRepository _repository;

        public GitHubAppService(IGitHubRepository repository)
        {
            _repository = repository;
        }

    }
}
