using System;

namespace HiringChallenge.API.Domain.Models
{
    public class GithubRepository
    {
        public GithubRepository()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
        public long RepositoryId { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public string Owner { get; set; }
        public string HtmlUrl { get; set; }
        public string Description { get; set; }
        public string Language { get; set; }
        public int StargazersCount { get; set; }
        public DateTime CreationDate { get; set; }
    }
}