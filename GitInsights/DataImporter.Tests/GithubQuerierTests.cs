using System;
using Xunit;
using DataImporter.Services;
using DataImporter.Interfaces;
using System.Threading.Tasks;

namespace DataImporter.Tests
{
    public class GithubQuerierTests
    {
        private readonly IGithubQuerier _githubQuerier;

        public GithubQuerierTests()
        {
            _githubQuerier = new GithubQuerier();
        }

        [Fact]
        public async Task GithubQuerier_NullLanguageShouldReturnNull()
        {
            var value = await _githubQuerier.FetchRepositoriesAsync(null);

            Assert.Equal(null, value);
        }
    }
}
