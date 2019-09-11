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
            ValidateParams(name, htmlUrl, description, createdAt, updatedAt, stargazersCount, language);
            Name = name;
            HtmlUrl = htmlUrl;
            Description = description;
            CreatedAt = createdAt;
            UpdatedAt = updatedAt;
            StargazersCount = stargazersCount;
            Language = language;
            LanguageId = language.Id;
        }

        private void ValidateParams(string name, string htmlUrl, string description, DateTime createdAt, DateTime updatedAt, int stargazersCount, Language language)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("Invalid parameter!", "Name");
            }

            if (string.IsNullOrWhiteSpace(htmlUrl))
            {
                throw new ArgumentException("Invalid parameter!", "HtmlUrl");
            }

            if (string.IsNullOrWhiteSpace(description))
            {
                throw new ArgumentException("Invalid parameter!", "Description");
            }

            if (createdAt == null || createdAt > DateTime.Now)
            {
                throw new ArgumentException("Invalid parameter!", "CreatedAt");
            }

            if (updatedAt == null || updatedAt > DateTime.Now)
            {
                throw new ArgumentException("Invalid parameter!", "UpdatedAt");
            }

            if (stargazersCount <= 0)
            {
                throw new ArgumentException("Invalid parameter!", "StargazersCount");
            }

            if (language == null)
            {
                throw new ArgumentException("Invalid parameter!", "Language");
            }
        }
    }
}