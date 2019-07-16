using System.Linq;
using DevHiringChallenge.Domain.Command.Inputs;
using DevHiringChallenge.Domain.Entities;
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
                Updated_At = "",
                Owner = new Owner("octocat", 1, "MDQ6VXNlcjE=", "https://github.com/images/error/octocat_happy.gif", "User", "https://api.github.com/users/octocat")
            };

            command.Validar();

            Assert.IsFalse(command.Notifications.Any());
        }

        [TestMethod]
        public void Deve_retornar_verdadeiro_quando_command_preenchido()
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
    }
}
