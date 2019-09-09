using System.Globalization;
using System.Runtime.CompilerServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DataImporter.Interfaces;
using DataImporter.Models;
using Domain.Entities;
using Flurl.Http;

namespace DataImporter.Services
{
    public class GithubQuerier : IGithubQuerier
    {
        public async Task<IEnumerable<Repository>> FetchRepositoriesAsync(string language, string topic)
        {
            if (string.IsNullOrEmpty(language)) return null;

            var url = "https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc";

            var query = "";

            if (string.IsNullOrEmpty(topic))
            {
                query = $"language:{language}";
            }
            else
            {
                query = $"{topic}+language:{language}";
            }

            var response = await url.
                            WithHeader("User-Agent", "request").
                            SetQueryParam("q", query).
                            SetQueryParam("sort","stars").
                            SetQueryParam("order","desc").
                            GetJsonAsync<Response>();

            var repositories = new List<Repository>();

            foreach (var item in response.Items)
            {
                DateTime.TryParse(item.CreatedAt, out var createdAt);

                DateTime.TryParse(item.UpdatedAt, out var updatedAt);

                var repository = new Repository(item.Name, item.HtmlUrl, item.Description, createdAt, updatedAt, item.StargazersCount, item.Language);

                repositories.Add(repository);
            }

            return repositories;
        }
    }
}