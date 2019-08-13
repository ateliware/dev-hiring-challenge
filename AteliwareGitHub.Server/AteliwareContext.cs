using System;
using Microsoft.EntityFrameworkCore;


namespace AteliwareGitHub.Server
{
    public class AteliwareContext : DbContext
    {
        public DbSet<GitRepos> GitRepositories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=tcp:ateliwaregit.database.windows.net,1433;Initial Catalog=ateliwaregit;Persist Security Info=False;User ID=ateliwaregit;Password=ateliware1406!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }
    }
}
