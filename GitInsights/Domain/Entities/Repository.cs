using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Repository
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string HtmlUrl { get; set; }     
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int StargazersCount { get; set; }
        public int LanguageId { get; set; }
        public Language Language { get; set; }

        public Repository()
        {
            
        }
        public Repository(string name, string htmlUrl, string description, DateTime createdAt, DateTime updatedAt, int stargazersCount, Language language)
        {
            Name = name;
            HtmlUrl = htmlUrl;
            Description = description;
            CreatedAt = createdAt;
            UpdatedAt = updatedAt;
            StargazersCount = stargazersCount;
            Language = language;
            LanguageId = language.Id;
        }
    }
}