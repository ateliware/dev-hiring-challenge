using Hiring.Challenge.Domain.Interfaces;
using Hiring.Challenge.Infrastructure.Repositories;
using Hiring.Challenge.Web;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System.IO;

namespace Hiring.Challenge.Tests
{
    public class BaseTests
    {
        protected GitHubRepository GitHubRepository { get; set; }
        protected IRepositoryService RepositoryService { get; set; }

        public BaseTests()
        {
            //Initial Configuration
            var env = new MockHostingEnvironment();
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            var Configuration = builder.Build();
            var services = new ServiceCollection();
            new Startup(Configuration).ConfigureServices(services);
            
            //Services
            GitHubRepository = services.BuildServiceProvider().GetService(typeof(GitHubRepository)) as GitHubRepository;
            RepositoryService = services.BuildServiceProvider().GetService(typeof(IRepositoryService)) as IRepositoryService;
        }
    }
    public class MockHostingEnvironment : IWebHostEnvironment
    {
        public string EnvironmentName { get; set; } = "Local";
        public string ApplicationName { get; set; } = "Hiring.Challenge";

        public IFileProvider WebRootFileProvider { get; set; }
        public IFileProvider ContentRootFileProvider { get; set; }

        public string ContentRootPath { get; set; } = Directory.GetCurrentDirectory();
        public string WebRootPath { get; set; } = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
    }
}
