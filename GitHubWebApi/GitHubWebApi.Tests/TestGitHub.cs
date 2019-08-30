namespace GitHubWebApi.Tests
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using GitHubWebApi.Controllers;
    using System.Web.Mvc;
    using System.Linq;
    using GitHubWebApi.Domain.Models;
    using System.Collections.Generic;

    [TestClass]
    public class TestGitHub
    {
        /// <summary>
        /// Test Load Repositories Using GitHub Api Service
        /// </summary>
        [TestMethod]        
        public void TestGetRepositorires()
        {
            var controller = new HomeController();
            var result = controller.GetRepositories() as JsonResult;
            var finalResult = result.Data;

            Assert.AreEqual("OK", finalResult);
        }

        /// <summary>
        /// Test load top repositories
        /// </summary>
        [TestMethod]
        public void TestRepositoryView()
        {
            var controller = new HomeController();
            var result = controller.Repository() as ViewResult;
            var list = (IList<GitHub>)result.ViewData.Model;

            Assert.AreNotEqual(0, list.Count());
        }

        /// <summary>
        /// Test Repository Detail
        /// </summary>
        [TestMethod]
        public void TestGetDetailView()
        {
            var controller = new HomeController();
            var result = controller.GetDetail(1) as JsonResult;
            var gitHub = (GitHub)result.Data;

            Assert.IsNotNull(gitHub);
        }

        /// <summary>
        /// Test access to view index
        /// </summary>
        [TestMethod]
        public void TestIndexView()
        {
            var controller = new HomeController();
            var result = controller.Index() as ViewResult;
            Assert.AreEqual("Index", result.ViewName);
        }
    }
}
