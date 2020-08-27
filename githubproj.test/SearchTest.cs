using githubproj.Exceptions;
using githubproj.Services.Implementation;
using System;
using System.Net.Http;
using Xunit;

namespace githubproj.test
{
    public class SearchTest
    {
        private readonly APIService _apiService = new APIService();
       
        [Fact]
        public void SearchSpecificStringGithubRepo()
        {
            string search = "javascript";
            HttpResponseMessage response = _apiService.getByDescription(search).Result;
            Assert.True(response.IsSuccessStatusCode);
        }
        
        [Fact]
        public void SearchSpecificStringGithubRepoByUrl()
        {
            string repo = "https://api.github.com/repos/TheAlgorithms/Python";
            HttpResponseMessage response = _apiService.getByUrl(repo).Result;
            Assert.True(response.IsSuccessStatusCode);

        }

        [Fact]
        public void SearchRepoNotFoundGithub()
        {
            string search = "imanonexistentrepository";
            var ex = Record.ExceptionAsync(async () => await _apiService.getByDescription(search));
            Assert.NotNull(ex);
        }
    }
}
