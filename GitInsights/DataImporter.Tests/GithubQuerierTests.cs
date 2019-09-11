using System;
using Xunit;
using DataImporter.Services;
using DataImporter.Interfaces;
using System.Threading.Tasks;
using Domain.Entities;

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
        public async Task GithubQuerier_NullLanguageShouldFail()
        {
            await Assert.ThrowsAsync<ArgumentException>("Language", async () => await _githubQuerier.FetchRepositoriesAsync(null));
        }

        [Theory]
        [InlineData("")]
        [InlineData(" ")]
        [InlineData(null)]
        public async Task GithubQuerier_NullLanguageNameShouldFail(string name)
        {
            var language = new Language();

            language.Name = name;

            await Assert.ThrowsAsync<ArgumentException>("Language", async () => await _githubQuerier.FetchRepositoriesAsync(language));
        }
    }
}
