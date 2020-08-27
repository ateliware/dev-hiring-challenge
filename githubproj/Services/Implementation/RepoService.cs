using githubproj.Domain.Models;
using githubproj.Exceptions;
using githubproj.Infrastructure.Repository.Interface;
using githubproj.Models;
using githubproj.Services.Interface;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace githubproj.Services.Implementation
{
    public class RepoService : IRepoService
    {
        private readonly IAPIService _apiService;
        private readonly IRepoRepository _repoService;

        public RepoService(IAPIService apiService, IRepoRepository repoService)
        {
            _apiService = apiService;
            _repoService = repoService;
        }

        public Task<HttpResponseMessage> GetByDescription(string searchString)
        {
            return _apiService.getByDescription(searchString);
        }

        public Task<HttpResponseMessage> GetByUrl(string url)
        {
            return _apiService.getByUrl(url);
        }

        public void SaveRepo(DetailsViewModel repo)
        {
            Repo githubRepo = new Repo
            {
                name = repo.name,
                owner = new Repo.Owner { avatar_url = repo.owner.avatar_url, login = repo.owner.login },
                url = repo.url,
                full_name = repo.full_name,
                description = repo.description,
                created_at = repo.created_at,
                git_url = repo.git_url
            };

            _repoService.Add(githubRepo);
        }
        public IList<Repo> Search(string searchString)
        {
            IList<Repo> repos = new List<Repo>();
            repos = _repoService.GetAll().Where(r => r.full_name.ToUpper().Contains(searchString.ToUpper())).ToList();
            if (repos.Count == 0)
                throw new RepoNotFoundException("I'm so sorry. Nothing found here (own)");

            return repos;
        }

       
    }
}
