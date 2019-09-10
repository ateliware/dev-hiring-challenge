using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.EntityConfig
{
    public class LanguageConfig : IEntityTypeConfiguration<Language>
    {
        public void Configure(EntityTypeBuilder<Language> builder)
        {
            builder.HasIndex(l => l.Id);
            builder.HasMany(l => l.Repositories);
            builder.HasData(
                new Language(1, "C#", "csharp"),
                new Language(2, "Ruby", "ruby" ),
                new Language(3, "Elixir", "elixir"),
                new Language(4, "C", "c"),
                new Language(5, "Go", "go"),
                new Language(6, "Python", "python"),
                new Language(7, "Java", "java"),
                new Language(8, "JavaScript", "javascript")
            );
        }
    }
}