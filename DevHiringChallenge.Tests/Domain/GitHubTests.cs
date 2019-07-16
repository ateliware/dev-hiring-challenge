using System.Collections.Generic;
using System.Linq;
using DevHiringChallenge.Domain.Command.Inputs;
using DevHiringChallenge.Domain.Entities;
using DevHiringChallenge.Domain.Results;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace DevHiringChallenge.Tests.Domain
{
    [TestClass]
    [TestCategory("Domain - GitHub")]
    public class GitHubTests
    {
        [TestMethod]
        public void Deve_retornar_falso_quando_command_preenchido()
        {
            var command = new CriarGitHubCommand()
            {
                Full_Name = "octocat/Hello-World",
                Description = "This your first repo!",
                Html_Url = "https://github.com/octocat/Hello-World",
                Id = 1296269,
                Name = "Hello-World",
                Node_Id = "MDEwOlJlcG9zaXRvcnkxMjk2MjY5",
                Updated_At = "2019-07-16",
                Created_At = "2019-07-16",
                Pushed_At = "2019-07-16",
                Language = "CSharp",
                Owner = new Owner("octocat", 1, "MDQ6VXNlcjE=", "https://github.com/images/error/octocat_happy.gif", "User", "https://api.github.com/users/octocat")
            };

            command.Validar();

            Assert.IsFalse(command.Notifications.Any());
        }

        [TestMethod]
        public void Deve_retornar_verdadeiro_quando_command_nao_preenchido()
        {
            var command = new CriarGitHubCommand();

            command.Validar();

            Assert.IsTrue(command.Notifications.Any());
        }

        [TestMethod]
        public void Deve_retornar_verdadeiro_quando_command_preenchido_e_owner_nao_preenchido()
        {
            var command = new CriarGitHubCommand()
            {
                Full_Name = "octocat/Hello-World",
                Description = "This your first repo!",
                Html_Url = "https://github.com/octocat/Hello-World",
                Id = 1296269,
                Name = "Hello-World",
                Node_Id = "MDEwOlJlcG9zaXRvcnkxMjk2MjY5",
                Updated_At = ""
            };

            command.Validar();

            Assert.IsTrue(command.Notifications.Any());
        }

        [TestMethod]
        public void Deve_retornar_falso_quando_githubresponse_result_preenchido()
        {
            var item = new GitHubResult()
            {
                Language = "C#",
                Owner = new OwnerResult(),
                Html_Url = "https://api.github.com/users/octocat",
                Name = "octocat",
                Description = "",
                Full_Name = "",
                Id = 1,
                Pushed_At = "",
                Created_At = "",
                Updated_At = "",
                Node_Id = "MDQ6VXNlcjE="
            };

            var result = new GitHubResponseResult()
            {
                Items = new List<GitHubResult>() { item },
                Incomplete_Result = false,
                Total_Count = 1
            };

            result.Validar();

            Assert.IsFalse(result.Notifications.Any());
        }

        [TestMethod]
        public void Deve_retornar_verdadeiro_quando_githubresponse_result_nao_preenchido()
        {
            var result = new GitHubResponseResult();

            result.Validar();

            Assert.IsTrue(result.Notifications.Any());
        }

        [TestMethod]
        public void Deve_retornar_verdadeiro_quando_github_result_nao_preenchido()
        {
            var result = new GitHubResult();

            result.Validar();

            Assert.IsTrue(result.Notifications.Any());
        }

        [TestMethod]
        public void Deve_retornar_falso_quando_github_result_preenchido()
        {
            var result = new GitHubResult()
            {
                Id = 1,
                Node_Id = "123",
                Created_At = "2019-07-16",
                Pushed_At = "2019-07-16",
                Updated_At = "2019-07-16",
                Description = "Teste",
                Name = "Guilherme",
                Full_Name = "Guilherme Lopes",
                Html_Url = "https://github.com/guiilopes/",
                Language = "CSharp",
                Owner = new OwnerResult()
            };

            result.Validar();

            Assert.IsFalse(result.Notifications.Any());
        }

        [TestMethod]
        public void Deve_retornar_verdadeiro_quando_owner_result_nao_preenchido()
        {
            var result = new OwnerResult();

            result.Validar();

            Assert.IsTrue(result.Notifications.Any());
        }

        [TestMethod]
        public void Deve_retornar_falso_quando_owner_result_preenchido()
        {
            var result = new OwnerResult()
            {
                Id = 1,
                Node_Id = "MDQ6VXNlcjU4MzIzMQ==",
                Avatar_Url = "https://avatars.githubusercontent.com/u/583231?v=3",
                Login = "octocat",
                Type = "User",
                Url = "https://api.github.com/users/octocat"
            };

            result.Validar();

            Assert.IsFalse(result.Notifications.Any());
        }

        [TestMethod]
        public void Deve_retornar_verdadeiro_quando_owner_nao_preenchido()
        {
            var result = new Owner("", 0, "", "", "", "");

            result.Validar();

            Assert.IsTrue(result.Notifications.Any());
        }

        [TestMethod]
        public void Deve_retornar_falso_quando_owner_preenchido()
        {
            var result = new Owner("octocat", 1, "MDQ6VXNlcjU4MzIzMQ==",
                "https://avatars.githubusercontent.com/u/583231?v=3", "User", "https://api.github.com/users/octocat");

            result.Validar();

            Assert.IsFalse(result.Notifications.Any());
        }

        [TestMethod]
        public void Deve_retornar_verdadeiro_quando_github_nao_preenchido()
        {
            var result = new GitHub(0, "", "", "", "", "", "", "", null, "", "");

            result.Validar();

            Assert.IsTrue(result.Notifications.Any());
        }

        [TestMethod]
        public void Deve_retornar_falso_quando_github_preenchido()
        {
            var owner = new Owner("octocat", 1, "MDQ6VXNlcjU4MzIzMQ==",
                "https://avatars.githubusercontent.com/u/583231?v=3", "User", "https://api.github.com/users/octocat");

            var result = new GitHub(1, "123", "Guilherme", "Guilherme Lopes", "Challenge", "2019-07-16", "2019-07-16", "2019-07-16", owner, "https://api.github.com/users/octocat", "CSharp");

            result.Validar();

            Assert.IsFalse(result.Notifications.Any());
        }
    }
}
