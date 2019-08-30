namespace GitHubWebApi.Controllers
{
    using GitHubWebApi.Domain.Services;
    using System.Web.Mvc;

    /// <summary>
    /// Base Controller to execute all tests
    /// </summary>
    public class HomeController : Controller
    {
        /// <summary>
        /// GitHubdService
        /// </summary>
        private IGithubService gitHubService = new GithubService();

        public ActionResult Index()
        {
            return View("Index");
        }

        /// <summary>
        /// Used to list all repositories
        /// </summary>
        /// <returns>ActionResult</returns>
        public ActionResult Repository()
        {
            var listRepository = gitHubService.GetAll();
            return View(listRepository);
        }

        /// <summary>
        /// Load repositories
        /// </summary>
        /// <returns>JsonResult</returns>
        public JsonResult GetRepositories()
        {
            var result = gitHubService.SearchRepositories();

            if (result)
            {
                return Json("OK", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("ERRO", JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Get GitHub Object by Id
        /// </summary>
        /// <returns>JsonResult</returns>
        public JsonResult GetDetail(int id)
        {
            var result = gitHubService.GetById(id);

            if (result != null)
            {
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }
    }
}