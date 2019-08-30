namespace GitHubWebApi.Infrastructure
{
    using System.Data.Entity;
    using GitHubWebApi.Domain.Models;

    public partial class GitHubDbContext : DbContext
    {
        public GitHubDbContext()
            : base("name=GitHubDbContext")
        {
            this.Database.CreateIfNotExists();
        }

        public virtual DbSet<GitHub> GitHub { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GitHub>()
                .Property(e => e.RepositoryName)
                .IsUnicode(false);
        }
    }
}
