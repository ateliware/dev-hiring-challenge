using System.Threading.Tasks;
using Xunit;

namespace Hiring.Challenge.Tests
{
    public class GitHubRepositoryTests : BaseTests
    {
        [Fact(DisplayName = "List Languages")]
        public void GetListLanguages()
        {
            var languages = GitHubRepository.GetLanguages();
            
            Assert.Equal(5, languages.Count);
        }

        [Theory(DisplayName = "Top Repositories")]
        [InlineData("python")]
        [InlineData("javascript")]
        [InlineData("csharp")]
        [InlineData("java")]
        [InlineData("php")]
        public async Task GetListTopRepositoriesFromLanguages(string language)
        {
            var repositories = await GitHubRepository.GetTopRepositoriesByLanguageAsync(language);

            Assert.NotNull(repositories);
            Assert.True(repositories.Count > 0);
        }

        [Theory(DisplayName = "Get specific repository info")]
        [InlineData("CyC2018","CS-Notes")]
        public void GetRepositoryFromId(string username, string repositoryName)
        {
            var repository = GitHubRepository.GetRepositoryAsync(username, repositoryName).Result;

            Assert.NotNull(repository);
            Assert.Equal("CS-Notes", repository.Name);
        }
    }
}
