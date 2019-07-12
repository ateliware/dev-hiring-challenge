using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using DevHiringChallenge.Domain.GitHubs.Entities;
using Microsoft.AspNetCore.Mvc;

namespace DevHiringChallenge.App.Controllers
{
    public class GitHubController : Controller
    {
        public HttpClient Client { get; }

        public GitHubController(HttpClient client)
        {
            client.BaseAddress = new Uri("https://api.github.com/");
            client.DefaultRequestHeaders.Add("Accept", "application/vnd.github.v3+json");
            client.DefaultRequestHeaders.Add("User-Agent", "HttpClientFactory-Sample");

            Client = client;
        }

        public async Task<IEnumerable<GitHub>> ObterRepositories(string language)
        {
            var response = await Client.GetAsync($"/search/repositories?q=stars:>=10000+language:{language}&sort=stars&order=desc");

            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadAsAsync<IEnumerable<GitHub>>();

            return result;
        }
    }
}
