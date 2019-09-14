namespace GitHubWebApi.Tests
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;        
    using System.Linq;
    using GitHubWebApi.Domain.Services;

    [TestClass]
    public class TestGitHub
    {
        /// <summary>
        /// GitHubService
        /// </summary>
        private readonly IGithubService service = new GithubService();

        /// <summary>
        /// Check if load the top repositories
        /// </summary>
        [TestMethod]
        public void TestLoadRepositories()
        {
            var result = service.SearchRepositories();
            Assert.IsTrue(result);
        }

        /// <summary>
        /// Check if load correclty the five top repositories
        /// </summary>
        [TestMethod]
        public void TestLoadTopRepositories()
        {
            var repositories = service.GetAll();
            Assert.AreEqual(5, repositories.Count());
        }

        /// <summary>
        /// Get Repository Detail
        /// </summary>
        [TestMethod]
        public void TestGetDetail()
        {
            var repositories = service.GetById(1);
            Assert.AreEqual(1, repositories.Id);
        }

        /// <summary>
        /// Must have only one top Csharp repository
        /// </summary>
        [TestMethod]
        public void TestGetCsharpRepository()
        {
            var repositories = service.GetAll().Where(x => x.Language == "C#");
            Assert.AreEqual(1, repositories.Count());
        }

        /// <summary>
        /// Must have only one top Java repository
        /// </summary>
        [TestMethod]
        public void TestGetJavaRepository()
        {
            var repositories = service.GetAll().Where(x => x.Language == "Java");
            Assert.AreEqual(1, repositories.Count());
        }

        /// <summary>
        /// Must have only one top FSharp repository
        /// </summary>
        [TestMethod]
        public void TestGetFSharpRepository()
        {
            var repositories = service.GetAll().Where(x => x.Language == "F#");
            Assert.AreEqual(1, repositories.Count());
        }

        /// <summary>
        /// Must have only one top Abap repository
        /// </summary>
        [TestMethod]
        public void TestGetAbapRepository()
        {
            var repositories = service.GetAll().Where(x => x.Language == "ABAP");
            Assert.AreEqual(1, repositories.Count());
        }

        /// <summary>
        /// Must have only one top Python repository
        /// </summary>
        [TestMethod]
        public void TestGetPythonRepository()
        {
            var repositories = service.GetAll().Where(x => x.Language == "Python");
            Assert.AreEqual(1, repositories.Count());
        }
    }
}
