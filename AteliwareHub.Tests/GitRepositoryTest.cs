using AteliwareHub.Infra;
using AteliwareHub.Web;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using System.IO;
using System.Threading.Tasks;
using Xunit;

namespace AteliwareHub.Tests
{
    public class GitRepositoryTest
    {


        private readonly GitRepository _gitRepository;

        public GitRepositoryTest()
        {
            Mock<IWebHostEnvironment> environment = new Mock<IWebHostEnvironment>();
            environment.Setup(m => m.ContentRootPath).Returns(Directory.GetCurrentDirectory());
            environment.Setup(m => m.EnvironmentName).Returns("Local");
            environment.Setup(m => m.ApplicationName).Returns("AteliwareHub");
            environment.Setup(m => m.WebRootPath).Returns(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"));

            var builder = new ConfigurationBuilder()
                                .SetBasePath(environment.Object.ContentRootPath)
                                .AddJsonFile("appsettings.Development.json");

            var services = new ServiceCollection();
            new Startup(builder.Build()).ConfigureServices(services);

            _gitRepository = services.BuildServiceProvider().GetService(typeof(GitRepository)) as GitRepository;
        }

        [Theory]
        [InlineData("elixir")]
        public async Task Get_Tops_Repositories(string language)
        {
            var repos = await _gitRepository.GetTopsFromLanguageAsync(language);

            Assert.NotNull(repos);
        }
    }
}
