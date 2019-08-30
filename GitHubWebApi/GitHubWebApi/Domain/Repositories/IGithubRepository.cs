namespace GitHubWebApi.Domain.Repositories
{
    using GitHubWebApi.Domain.Models;
    using System.Collections.Generic;

    /// <summary>
    /// Interface of GitHubRepository
    /// </summary>
    public interface IGithubRepository
    {
        /// <summary>
        /// Persist list on database
        /// </summary>
        /// <param name="repositories">Repositories</param>
        /// <returns>true if success and false if error</returns>
        bool AddAll(IList<GitHub> repositories);

        /// <summary>
        /// Get All Items from database
        /// </summary>
        /// <returns>List of repositories</returns>
        IList<GitHub> GetAll();

        /// <summary>
        /// Get By Id
        /// </summary>
        /// <returns>Individual Repositorie</returns>
        GitHub GetById(long id);
    }
}