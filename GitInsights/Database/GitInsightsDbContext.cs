using System;
using Domain.Entities;
using Database.EntityConfig;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Database
{
    public class GitInsightsDbContext : DbContext
    {
        public DbSet<Repository> Repositories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Language> Languages { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)        
        {
            var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
            var databaseUri = new Uri(databaseUrl);
            var userInfo = databaseUri.UserInfo.Split(':');

            var builder = new NpgsqlConnectionStringBuilder
            {
                Host = databaseUri.Host,
                Port = databaseUri.Port,
                Username = userInfo[0],
                Password = userInfo[1],
                Database = databaseUri.LocalPath.TrimStart('/')
            };

            optionsBuilder.UseNpgsql(builder.ToString());
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