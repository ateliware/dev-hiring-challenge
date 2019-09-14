namespace GitHubWebApi.Domain.Repositories
{
    using GitHubWebApi.Domain.Models;
    using GitHubWebApi.Infrastructure;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// Implementation of GitHubRepository
    /// </summary>
    public class GithubRepository : IGithubRepository
    {
        /// <summary>
        /// Data Repository
        /// </summary>
        private GitHubDbContext dataBase = new GitHubDbContext();

        /// <summary>
        /// Persist list on database
        /// </summary>
        /// <param name="repositories">Repositories</param>
        /// <returns>true if success and false if error</returns>
        public bool AddAll(IList<GitHub> repositories)
        {
            try
            {
                foreach (var item in repositories)
                {
                    dataBase.GitHub.Add(item);
                }

                dataBase.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return true;
        }

        /// <summary>
        /// Get All Items from database
        /// </summary>
        /// <returns>List of repositories</returns>
        public IList<GitHub> GetAll()
        {
            return dataBase.GitHub.ToList();
        }

        /// <summary>
        /// Get By Id
        /// </summary>
        /// <returns>Individual Repositorie</returns>
        public GitHub GetById(long id)
        {
            return dataBase.GitHub.Where(x => x.Id == id).FirstOrDefault();
        }

        /// <summary>
        /// Remove repository by id
        /// </summary>
        /// <param name="idGithub">Id GitHUb Repository</param>       
        public void Remove(long idGithub)
        {
            var gitHubRepo = dataBase.GitHub.Where(x => x.IdGitHub == idGithub).FirstOrDefault();
            if (gitHubRepo != null)
            {
                dataBase.GitHub.Remove(gitHubRepo);
                dataBase.SaveChanges();
            }
        }

        /// <summary>
        /// Remove all itens from table
        /// </summary>        
        public void RemoveAll()
        {
            dataBase.Database.ExecuteSqlCommand("TRUNCATE TABLE [DBO].[GitHub]");
            dataBase.SaveChanges();
        }
    }
}