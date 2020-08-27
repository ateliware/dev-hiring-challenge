using githubproj.Exceptions;
using githubproj.Services.Interface;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace githubproj.Services.Implementation
{
    public class APIService : IAPIService
    {
        private const string UriString = "https://api.github.com/";
        private readonly HttpClient client = new HttpClient();

        public APIService()
        {
            client.BaseAddress = new Uri(UriString);
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.UserAgent.TryParseAdd("request");
        }

        public async Task<HttpResponseMessage> getByDescription(string searchString)
        {
            HttpResponseMessage response = client.GetAsync($"search/repositories?q={searchString}&per_page=50").Result;
            if (!response.IsSuccessStatusCode || response.Content.Headers.ContentLength == 55)
                throw new RepoNotFoundException("I'm so sorry. Nothing found here (Github)");

            return response;
        }

        public async Task<HttpResponseMessage> getByUrl(string url)
        {
            HttpResponseMessage response = client.GetAsync(url).Result;
            if (!response.IsSuccessStatusCode || response.Content.Headers.ContentLength == 55)
                throw new RepoNotFoundException("I'm so sorry. Nothing found here (Github)");

            return response;

        }
        
    }
}
