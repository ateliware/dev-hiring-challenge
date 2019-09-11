using System.Globalization;
using System.Runtime.CompilerServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DataImporter.Interfaces;
using DataImporter.Models;
using Domain.Entities;
using Flurl.Http;
using System.Linq;

namespace DataImporter.Services
{
    public class GithubQuerier : IGithubQuerier
    {
        public async Task<IEnumerable<Repository>> FetchRepositoriesAsync(Language language)
        {
            if (language == null || string.IsNullOrEmpty(language.QueryName)) return null;

            var url = "https://api.github.com/search/repositories";

            var query = $"language:{language.QueryName}";

            var response = await url.
                            WithHeader("User-Agent", "request").
                            SetQueryParam("q", query).
                            SetQueryParam("sort","stars").
                            SetQueryParam("order","desc").
                            GetJsonAsync<Response>();

            var repositories = new List<Repository>();

            var topTen = response.Items.OrderByDescending(i => i.StargazersCount).Take(10).ToList();

            foreach (var item in topTen)
            {
                DateTime.TryParse(item.CreatedAt, out var createdAt);

                DateTime.TryParse(item.UpdatedAt, out var updatedAt);

                var repository = new Repository(item.Name, item.HtmlUrl, item.Description, createdAt, updatedAt, item.StargazersCount, language);

                repositories.Add(repository);
            }

            return repositories;
        }
    }
}