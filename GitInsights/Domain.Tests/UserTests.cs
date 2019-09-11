using System.Reflection;
using System;
using Xunit;
using Domain.Entities;

namespace Domain.Tests
{
    public class UserTests
    {
        [Theory]
        [InlineData("")]
        [InlineData(" ")]
        [InlineData(null)]
        public void User_NullNameShouldFail(string name)
        {
            Assert.Throws<ArgumentException>("Name", () => new User(name, "email", "password", "salt"));
        }

        [Theory]
        [InlineData("")]
        [InlineData(" ")]
        [InlineData(null)]
        public void User_NullEmailShouldFail(string email)
        {
            Assert.Throws<ArgumentException>("Email", () => new User("name", email, "password", "salt"));
        }

        [Theory]
        [InlineData("")]
        [InlineData(" ")]
        [InlineData(null)]
        public void User_NullPasswordShouldFail(string password)
        {
            Assert.Throws<ArgumentException>("Password", () => new User("name", "email", password, "salt"));
        }

        [Theory]
        [InlineData("")]
        [InlineData(" ")]
        [InlineData(null)]
        public void User_NullSaltShouldFail(string salt)
        {
            Assert.Throws<ArgumentException>("Salt", () => new User("name", "email", "password", salt));
        }
    }
}