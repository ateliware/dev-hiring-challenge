using System;
using Microsoft.EntityFrameworkCore;


namespace AteliwareGitHub.Server
{
    public class AteliwareContext : DbContext
    {
        public DbSet<GitRepos> GitRepositories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=ateliwaregit;User Id=sa;Password=Ateliware1406!;");
        }
    }
}
