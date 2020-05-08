using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace Hiring.Challenge.Tests
{

    public class RepositoryServiceTests : BaseTests
    {
        [Fact(DisplayName = "List Languages")]
        public void GetListLanguages()
        {
            var languages = RepositoryService.GetLanguages();

            Assert.Equal(5, languages.Count());
        }

        [Theory(DisplayName = "Top Repositories")]
        [InlineData("python")]
        [InlineData("javascript")]
        [InlineData("csharp")]
        [InlineData("java")]
        [InlineData("php")]
        public async Task GetListTopRepositoriesFromLanguages(string language)
        {
            var repositories = await RepositoryService.GetTopRepositoriesFromLanguageAsync(language);

            Assert.NotNull(repositories);
            Assert.True(repositories.Count() > 0);
        }

        [Fact(DisplayName = "Get specific repository info")]
        public async Task GetRepositoryFromId()
        {
            var repositories = await RepositoryService.GetTopRepositoriesFromLanguageAsync("csharp");

            var repository = await RepositoryService.GetAsync(repositories.FirstOrDefault().Id);

            Assert.NotNull(repository);
            Assert.Equal(repositories.FirstOrDefault().Id, repository.Id);
        }
    }
}
