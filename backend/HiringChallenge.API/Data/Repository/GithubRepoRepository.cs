using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using HiringChallenge.API.Domain.Context;
using HiringChallenge.API.Domain.Models;
using HiringChallenge.API.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace HiringChallenge.API.Data.Repository
{
    public class GithubRepoRepository : BaseRepository, IGithubRepoRepository
    {
        public GithubRepoRepository(AppDbContext context) : base(context)
        {
        }

        public void CreateRepo(GithubRepository repo)
        {
            _context.Repositories.AddAsync(repo);
        }

        public void DeleteRepo(GithubRepository repo)
        {
            _context.Repositories.Remove(repo);
        }

        public async Task<GithubRepository> FindRepoAsync(Guid repoId)
        {
            return await _context.Repositories.FirstOrDefaultAsync(repo => repo.Id.Equals(repoId));
        }

        public async Task<IEnumerable<GithubRepository>> GetReposAsync()
        {
            return await _context.Repositories.ToListAsync();
        }
    }
}