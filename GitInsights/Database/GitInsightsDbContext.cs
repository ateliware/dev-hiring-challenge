using System;
using Domain.Entities;
using Database.EntityConfig;
using Microsoft.EntityFrameworkCore;

namespace Database
{
    public class GitInsightsDbContext : DbContext
    {
        public DbSet<Repository> Repositories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Language> Languages { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)        
        {
            optionsBuilder.UseNpgsql(Environment.GetEnvironmentVariable("CONN_STRING"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ForNpgsqlUseIdentityColumns();

            modelBuilder.ApplyConfiguration(new RepositoryConfig());
            modelBuilder.ApplyConfiguration(new UserConfig());
            modelBuilder.ApplyConfiguration(new LanguageConfig());

            modelBuilder.HasSequence<int>("LanguageNumbers")
                .StartsAt(9)
                .IncrementsBy(1);

            modelBuilder.Entity<Language>()
                .Property(o => o.Id)
                .HasDefaultValueSql("nextval('\"LanguageNumbers\"')");
        }
    }
}