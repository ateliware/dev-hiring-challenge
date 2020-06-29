using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HiringChallenge.API.Domain.Models;
using HiringChallenge.API.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
//using HiringChallenge.API.Models;

namespace HiringChallenge.API.Controllers
{
    [Route("api/repositories")]
    [ApiController]
    public class GithubRepositoriesController : ControllerBase
    {
        private readonly IGithubRepoRepository _repository;
        private readonly IUnitOfWork _unitOfWork;

        public GithubRepositoriesController(IGithubRepoRepository repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> GetRepos()
        {
            var repos = await _repository.GetReposAsync();
            return Ok(repos);
        }

        [HttpGet("{id}", Name = "GetRepoById")]
        public async Task<IActionResult> GetRepoById(Guid id)
        {
            var repo = await _repository.FindRepoAsync(id);
            if (repo == null)
            {
                return NotFound($"Repository with id '{id}' not found");
            }
            return Ok(repo);
        }

        [HttpPost]
        public async Task<IActionResult> CreateRepo(GithubRepository githubRepo)
        {
            _repository.CreateRepo(githubRepo);
            await _unitOfWork.SaveChangesAsync();

            return CreatedAtRoute("GetRepoById", new { id = githubRepo.Id }, githubRepo);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRepo(Guid id)
        {
            var repo = await _repository.FindRepoAsync(id);
            if (repo == null)
            {
                return NotFound($"Repository with id '{id}' not found");
            }

            _repository.DeleteRepo(repo);
            await _unitOfWork.SaveChangesAsync();
            return NoContent();
        }
    }
}