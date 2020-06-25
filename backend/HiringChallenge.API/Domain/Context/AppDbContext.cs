using HiringChallenge.API.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace HiringChallenge.API.Domain.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<GithubRepository> Repositories { get; set; }
    }
}