using System.Reflection;
using System;
using Xunit;
using Domain.Entities;

namespace Domain.Tests
{
    public class LanguageTests
    {
        [Fact]
        public void Language_NullNameShouldFail()
        {
            Assert.Throws<ArgumentException>("Name", () => new Language(null, "test"));
        }

        [Fact]
        public void Language_NullQueryNameShouldFail()
        {
            Assert.Throws<ArgumentException>("QueryName", () => new Language("test", null));
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-1)]
        [InlineData(-10)]
        [InlineData(-500)]
        public void Language_ZeroOrLessIdShouldFail(int id)
        {
            Assert.Throws<ArgumentException>("Id", () => new Language(id, "test", "test"));
        }
    }
}
