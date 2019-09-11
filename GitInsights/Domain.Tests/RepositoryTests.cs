using System.Reflection;
using System;
using Xunit;
using Domain.Entities;

namespace Domain.Tests
{
    public class RepositoryTests
    {
        [Theory]
        [InlineData("")]
        [InlineData(" ")]
        [InlineData(null)]
        public void Repository_NullNameShouldFail(string name)
        {
            Assert.Throws<ArgumentException>("Name", () => new Repository(name, "htmlUrl", "description", DateTime.Now, DateTime.Now, 1, new Language()));
        }

        [Theory]
        [InlineData("")]
        [InlineData(" ")]
        [InlineData(null)]
        public void Repository_NullHtmlUrlShouldFail(string htmlUrl)
        {
            Assert.Throws<ArgumentException>("HtmlUrl", () => new Repository("name", htmlUrl, "description", DateTime.Now, DateTime.Now, 1, new Language()));
        }

        [Theory]
        [InlineData("")]
        [InlineData(" ")]
        [InlineData(null)]
        public void Repository_NullDescriptionShouldFail(string description)
        {
            Assert.Throws<ArgumentException>("Description", () => new Repository("name", "htmlUrl", description, DateTime.Now, DateTime.Now, 1, new Language()));
        }

        [Fact]
        public void Repository_CreatedAtAfterNowShouldFail()
        {
            Assert.Throws<ArgumentException>("CreatedAt", () => new Repository("name", "htmlUrl", "description", DateTime.Now.AddHours(1), DateTime.Now, 1, new Language()));
        }

        [Fact]
        public void Repository_UpdatedAtAfterNowShouldFail()
        {
            Assert.Throws<ArgumentException>("UpdatedAt", () => new Repository("name", "htmlUrl", "description", DateTime.Now, DateTime.Now.AddHours(1), 1, new Language()));
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-1)]
        [InlineData(-10)]
        [InlineData(-500)]
        public void Repository_ZeroOrLessStargazersCountShouldFail(int stargazersCount)
        {
            Assert.Throws<ArgumentException>("StargazersCount", () => new Repository("name", "htmlUrl", "description", DateTime.Now, DateTime.Now, stargazersCount, new Language()));
        }

        [Fact]
        public void Repository_NullLanguageShouldFail()
        {
            Assert.Throws<ArgumentException>("Language", () => new Repository("name", "htmlUrl", "description", DateTime.Now, DateTime.Now, 1, null));
        }
    }
}