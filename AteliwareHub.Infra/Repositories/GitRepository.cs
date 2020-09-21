using AteliwareHub.Domain;
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

namespace AteliwareHub.Infra
{
    public class GitRepository 
    {
        private readonly string _apiurl;

        private readonly string _username;
        private readonly string _token;

        public GitRepository(IConfiguration configuration)
        {
            _apiurl = configuration["GITHUB:API_URL"];
            _username = configuration["GITHUB:USERNAME"];
            _token = configuration["GITHUB:TOKEN"];
        }

        public async Task<List<Repository>> GetTopsFromLanguageAsync(string lang)
        {
            var url = $"search/repositories?sort=stars&order=desc&q=language:{lang}";
            var response = await SendAsync(url);

            var repositories = (response.items as JArray).ToArray();

            return repositories.Select(x => new Repository
            {
                Name = x.Value<string>("name"),
                FullName = x.Value<string>("full_name"),
                Url = x.Value<string>("html_url"),
                Description = x.Value<string>("description"),
                Language = x.Value<string>("language"),
                Stars = x.Value<int>("stargazers_count"),
                CreateDate = DateTime.Parse(x.Value<string>("created_at"), CultureInfo.InvariantCulture),
                LastUpdate = DateTime.Parse(x.Value<string>("updated_at"), CultureInfo.InvariantCulture),
                Owner = new User
                {
                    UserName = x.Value<JToken>("owner").Value<string>("login"),
                    ImageUrl = x.Value<JToken>("owner").Value<string>("avatar_url"),
                    Url = x.Value<JToken>("owner").Value<string>("html_url")
                }
            }).ToList();
        }

        public IEnumerable<string> GetLanguages() => new string[] { "Go", "Javascript", "Ruby", "Elixir", "Python" };

        private async Task<dynamic> SendAsync(string url)
        {
            using var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, new Uri($"{_apiurl}/{url}"));
            var basicToken = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes($"{_username}:{_token}"));
            request.Headers.Add("Authorization", $"Basic {basicToken}");
            request.Headers.Add("User-Agent", "Jasoniel");

            var response = await client.SendAsync(request);
            return JsonConvert.DeserializeObject<dynamic>(await response.Content?.ReadAsStringAsync());
        }
    }
}
