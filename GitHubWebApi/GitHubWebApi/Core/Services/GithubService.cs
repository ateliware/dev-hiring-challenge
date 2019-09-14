namespace GitHubWebApi.Domain.Services
{
    using GitHubWebApi.Domain.Models;
    using GitHubWebApi.Domain.Repositories;
    using Octokit;
    using System.Linq;
    using System.Collections.Generic;
    using System;

    /// <summary>
    /// Implentation of GitHubService
    /// </summary>
    public class GithubService : IGithubService
    {
        /// <summary>
        /// Data Repository
        /// </summary>
        private IGithubRepository repository = new GithubRepository();

        /// <summary>
        /// Search and store the top repositories of five languages
        /// </summary>
        /// <returns>True if success and fail if something wrong ocurred</returns>
        public bool SearchRepositories()
        {
            try
            {
                var listRepositories = new List<GitHub>();

                var csharp = getTopRepositoriesByLanguage(Language.CSharp);
                var java = getTopRepositoriesByLanguage(Language.Java);
                var php = getTopRepositoriesByLanguage(Language.FSharp);
                var javascript = getTopRepositoriesByLanguage(Language.Abap);
                var python = getTopRepositoriesByLanguage(Language.Python);

                // Clear current list
                repository.RemoveAll();

                // Add to be persisted
                listRepositories.Add(csharp);
                listRepositories.Add(java);
                listRepositories.Add(php);
                listRepositories.Add(javascript);
                listRepositories.Add(python);

                // Save the search
                repository.AddAll(listRepositories);
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        /// <summary>
        /// Get All Repositories
        /// </summary>
        /// <returns>List of all repositories</returns>
        public IList<GitHub> GetAll()
        {
            return repository.GetAll();
        }

        /// <summary>
        /// Get GitHub Repository by Id
        /// </summary>
        /// <param name="id">Identification</param>
        /// <returns>GitHub</returns>
        public GitHub GetById(int id)
        {
            return repository.GetById(id);
        }

        /// <summary>
        /// Method used to get top repository by language
        /// </summary>
        /// <param name="language">Enum Language</param>
        /// <returns>GitHub (Entity Database to be persisted) </returns>
        private GitHub getTopRepositoriesByLanguage(Language language)
        {
            // Initialize client
            var client = new GitHubClient(new ProductHeaderValue("GitHubWebApi"));            

            // Creates a request
            var request = new SearchRepositoriesRequest()
            {
                Language = language,
                SortField = RepoSearchSort.Stars,
                Order = SortDirection.Descending
            };           

            var resultService = client.Search.SearchRepo(request).Result;

            var list = resultService.Items;

            // Execute search
            var result = resultService.Items.OrderByDescending(x => x.StargazersCount).FirstOrDefault();

            var gitHub = new GitHub()
            {
                IdGitHub = result.Id,
                RepositoryName = result.Name,
                Language = result.Language,
                Owner = result.Owner.Login,
                GitUrl = result.GitUrl,
                CreationDate = result.CreatedAt.DateTime,
                Stars = result.StargazersCount
            };

            return gitHub;
        }
    }
}