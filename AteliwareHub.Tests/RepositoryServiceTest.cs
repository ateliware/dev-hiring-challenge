using AteliwareHub.Domain.Contracts;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using System.Linq;
using Xunit;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using AteliwareHub.Web;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using AteliwareHub.Domain;
using Microsoft.EntityFrameworkCore;
using AteliwareHub.Domain.Context;
using AteliwareHub.Service; 
using AteliwareHub.Infra;
using MockQueryable.Moq;

namespace AteliwareHub.Tests
{
    public class RepositoryServiceTest
    {
        private readonly IRepositoryService _repositoryService;
        private IConfiguration configuration;

      
        public RepositoryServiceTest()
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
            configuration = services.BuildServiceProvider().GetService<IConfiguration>();

            _repositoryService = services.BuildServiceProvider().GetService(typeof(IRepositoryService)) as IRepositoryService;
        }

        [Fact]
        public void Get_Languages()
        {

            var languages = _repositoryService.GetLanguages();

            Assert.Equal(5, languages.Count());
        }


        [Fact]
        public async Task GetById()
        {
            var data = new List<Repository>{

                new Repository {
                    CreateDate = DateTime.Now.AddDays(-2),
                    LastUpdate = DateTime.Now,
                    Description = "Fake Repository for test only",
                    Language = "Elixir",
                    RepositoryId = 1,
                    FullName = "Fake Elixir lib",
                    Name = "Fake Elixir lib",
                    Owner = new User {
                        ImageUrl = "fake.gif",
                        UserId = 1,
                        UserName = "Fakerson Santana"
                    },
                    Stars = 5000,
                    Url = "https://www.github.com/fake/elixir"
            }};

            var options = new DbContextOptionsBuilder<ApplicationContext>()
                 .UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=AteliwareHub;MultipleActiveResultSets=true")
                 .Options;


            var dbSet = data.AsQueryable().BuildMockDbSet();
            var mockContext = new Mock<ApplicationContext>(options);        


            mockContext.Setup(a => a.Repositories).Returns(dbSet.Object);

            var gitrepository = new GitRepository(configuration);
            var service = new RepositoryService(mockContext.Object, gitrepository);
            var repo = await service.GetAsync(1);


            Assert.NotNull(repo);
            Assert.Equal("Fake Elixir lib",repo.FullName);
            Assert.Equal("Fakerson Santana", repo.Owner.UserName);
        }

    }
}
