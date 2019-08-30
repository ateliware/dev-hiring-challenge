using GitHubWebApi.Domain.Models;
using System.Collections.Generic;

namespace GitHubWebApi.Domain.Services
{
    /// <summary>
    /// Interface of GitHubService
    /// </summary>
    public interface IGithubService
    {
        /// <summary>
        /// Search and store the top repositories of five languages
        /// </summary>
        /// <returns>True if success and fail if something wrong ocurred</returns>
        bool SearchRepositories();

        /// <summary>
        /// Get All Repositories
        /// </summary>
        /// <returns>List of all repositories</returns>
        IList<GitHub> GetAll();

        /// <summary>
        /// Get GitHub Repository by Id
        /// </summary>
        /// <param name="id">Identification</param>
        /// <returns>GitHub</returns>
        GitHub GetById(int id);
    }
}