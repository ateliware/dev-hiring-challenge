using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.EntityConfig
{
    public class UserRepositoryConfig : IEntityTypeConfiguration<UserRepository>
    {
        public void Configure(EntityTypeBuilder<UserRepository> builder)
        {
            builder.HasKey(ur => new { ur.UserId, ur.RepositoryId });
            builder.HasOne(ur=> ur.User)
                .WithMany(u => u.UserRepository)
                .HasForeignKey(ur => ur.UserId);
            builder.HasOne(ur=> ur.Repository)
                .WithMany(r => r.UserRepository)
                .HasForeignKey(ur => ur.RepositoryId);
        }
    }
}