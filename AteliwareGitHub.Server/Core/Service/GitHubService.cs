using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using AteliwareGitHub.Server.Core.Interface;
using AteliwareGitHub.Shared;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace AteliwareGitHub.Server.Core.Service
{
    public class GitHubService : IGitHubService
    {
        public IHttpClientFactory httpclientFactory { get; set; }

        private const string requestLangs = "/repos/dotnet/corefx/languages";

        public async Task<IEnumerable<LanguagesDTO>> Languages()
        {
            var client = httpclientFactory.CreateClient("github");

            var response = await client.GetAsync(requestLangs);

            response.EnsureSuccessStatusCode();

            var listDictionary = JsonConvert.DeserializeObject<Dictionary<string, int>>(response.Content.ReadAsStringAsync().Result);

            var result = from b in listDictionary
                         select new LanguagesDTO()
                         {
                             name = b.Key,
                             qtd = b.Value
                         };

            return result;
        }
    }
}
