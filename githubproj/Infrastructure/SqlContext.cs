using githubproj.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using static githubproj.Domain.Models.Repo;

namespace githubproj.Infrastructure
{
    public class SqlContext : DbContext
    {
        public SqlContext()
        {

        }

        public SqlContext(DbContextOptions<SqlContext> options) : base(options) { }

        public DbSet<Repo> Repo { get; set; }
        public DbSet<Owner> Owner { get; set; }

        public override int SaveChanges()
        {
            foreach (var entry in ChangeTracker.Entries().Where(entry => entry.Entity.GetType().GetProperty("Created") != null))
            {
                if (entry.State == EntityState.Added)
                    entry.Property("Created").CurrentValue = DateTime.Now;
                if (entry.State == EntityState.Modified)
                    entry.Property("Created").IsModified = false;
            }
            return base.SaveChanges();
        }
    }
}
