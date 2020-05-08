using Hiring.Challenge.Domain.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Hiring.Challenge.Infrastructure.Repositories
{
    public class GitHubRepository
    {
        readonly string _username;
        readonly string _token;

        readonly string _baseUrl = "https://api.github.com/";

        public GitHubRepository(IConfiguration configuration)
        {
            _username = configuration["GitHub:Username"];
            _token = configuration["GitHub:Token"];
        }

        public List<string> GetLanguages()
        {
            var languages = new string[] { "python", "javascript", "csharp", "java", "php" };
            
            return languages.ToList();
        }

        public async Task<List<Repository>> GetTopRepositoriesByLanguageAsync(string language)
        {
            var action = $"search/repositories?sort=stars&order=desc&q=language:{language}";
            var response = await SendAsync(action, HttpMethod.Get);

            var repositories = response.items as JArray;
            
            return repositories.Select(x => ToModel(x) as Repository).ToList();

        }
        public async Task<Repository> GetRepositoryAsync(string username, string repositoryName)
        {
            var action = $"repos/{username}/{repositoryName}";
            var response = await SendAsync(action, HttpMethod.Get);

            return ToModel(response);
        }

        private async Task<dynamic> SendAsync(string action, HttpMethod method)
        {
            using (var client = new HttpClient())
            {
                var request = new HttpRequestMessage(HttpMethod.Get, new Uri($"{_baseUrl}{action}"));
                var basicToken = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes($"{_username}:{_token}"));
                request.Headers.Add("Authorization", $"Basic {basicToken}");
                request.Headers.Add("User-Agent", "FelipeW");

                var response = await client.SendAsync(request);
                return JsonConvert.DeserializeObject<dynamic>(await response.Content?.ReadAsStringAsync());
            }
        }

        private Repository ToModel(JToken model)
        {
            return new Repository
            {
                Name = model.Value<string>("name"),
                FullName = model.Value<string>("full_name"),
                Url = model.Value<string>("html_url"),
                Description = model.Value<string>("description"),
                Language = model.Value<string>("language"),
                Stars = model.Value<int>("stargazers_count"),
                CreateDate = DateTime.Parse(model.Value<string>("created_at"), CultureInfo.InvariantCulture),
                LastUpdate = DateTime.Parse(model.Value<string>("updated_at"), CultureInfo.InvariantCulture),
                Owner = new User
                {
                    Username = model.Value<JToken>("owner").Value<string>("login"),
                    ImageUrl = model.Value<JToken>("owner").Value<string>("avatar_url"),
                    Url = model.Value<JToken>("owner").Value<string>("html_url")
                }
            };
        }
    }
}
