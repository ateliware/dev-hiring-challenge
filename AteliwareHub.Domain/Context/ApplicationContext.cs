using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace AteliwareHub.Domain.Context
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options): base(options)
        {

        }

        public virtual DbSet<Repository> Repositories{ get; set; }
        public virtual DbSet<Repository> Users{ get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().Ignore(m => m.ToViewModel);
            base.OnModelCreating(modelBuilder);
        }
    }
}
