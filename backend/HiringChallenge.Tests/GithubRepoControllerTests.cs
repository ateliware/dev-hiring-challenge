using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GenFu;
using HiringChallenge.API.Controllers;
using HiringChallenge.API.Domain.Models;
using HiringChallenge.API.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace HiringChallenge.Tests
{
    public class GithubRepoControllerTests
    {
        private readonly Mock<IGithubRepoRepository> _repository;
        private readonly Mock<IUnitOfWork> _unitOfWork;
        private readonly GithubRepositoriesController _controller;
        public GithubRepoControllerTests()
        {
            _repository = new Mock<IGithubRepoRepository>();
            _unitOfWork = new Mock<IUnitOfWork>();
            _controller = new GithubRepositoriesController(_repository.Object, _unitOfWork.Object);
        }
        private List<GithubRepository> GetFakeData()
        {
            var repos = A.ListOf<GithubRepository>(20);
            return repos;
        }

        [Fact]
        public void GetRepos_WhenCalled_ReturnsOkResult()
        {

            var repos = GetFakeData();
            _repository.Setup(x => x.GetReposAsync()).ReturnsAsync(repos);

            var okResult = _controller.GetRepos();

            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public void GetRepos_WhenCalled_ReturnsAllRepositories()
        {
            var repos = GetFakeData();
            _repository.Setup(x => x.GetReposAsync()).ReturnsAsync(repos);

            var okResult = _controller.GetRepos().Result as OkObjectResult;

            var actualRepos = Assert.IsType<List<GithubRepository>>(okResult.Value);
            Assert.Equal(20, actualRepos.Count());
        }

        [Fact]
        public void GetRepoById_UknownGuidPassed_ReturnsNotFoundResult()
        {
            var notFoundResult = _controller.GetRepoById(Guid.NewGuid());
            Assert.IsType<NotFoundObjectResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetRepoById_ExistingGuidPassed_ReturnsOkResult()
        {
            var repo = GetFakeData().First();
            _repository.Setup(x => x.FindRepoByIdAsync(repo.Id)).ReturnsAsync(repo);
            var result = await _controller.GetRepoById(repo.Id);

            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void GetRepoById_ExistingGuidPassed_ReturnsRepositoryObject()
        {
            var repo = GetFakeData().First();
            _repository.Setup(x => x.FindRepoByIdAsync(repo.Id)).ReturnsAsync(repo);
            var result = await _controller.GetRepoById(repo.Id) as OkObjectResult;

            Assert.IsType<GithubRepository>(result.Value);
            Assert.Equal(repo, result.Value);
        }

        [Fact]
        public async void CreateRepo_WhenCalled_ReturnsCreatedResponse()
        {
            var repo = GetFakeData().First();
            _repository.Setup(x => x.CreateRepo(repo));
            var createdResult = await _controller.CreateRepo(repo);
            Assert.IsType<CreatedAtRouteResult>(createdResult);
        }

        [Fact]
        public async void CreateRepo_WhenCalled_ReturnsCreatedObject()
        {
            var repo = GetFakeData().First();
            _repository.Setup(x => x.CreateRepo(repo));
            var result = await _controller.CreateRepo(repo) as CreatedAtRouteResult;

            Assert.IsType<GithubRepository>(result.Value);
            Assert.Equal(repo, result.Value);
        }

        [Fact]
        public async void DeleteRepo_WhenCalled_ReturnsNoContentResult()
        {
            var repo = GetFakeData().First();
            _repository.Setup(x => x.FindRepoByIdAsync(repo.Id)).ReturnsAsync(repo);
            _repository.Setup(x => x.DeleteRepo(repo));
            var result = await _controller.DeleteRepo(repo.Id);

            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async void DeleRepo_UnknownGuidPassed_ReturnsNotFoundResult()
        {
            var repo = GetFakeData().First();
            _repository.Setup(x => x.DeleteRepo(repo));
            var result = await _controller.DeleteRepo(repo.Id);

            Assert.IsType<NotFoundObjectResult>(result);
        }
    }
}