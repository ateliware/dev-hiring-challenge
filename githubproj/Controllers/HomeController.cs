using githubproj.Domain.Models;
using static githubproj.Models.BaseModel;
using static githubproj.Utils.Enums;
using githubproj.Infrastructure.Repository.Interface;
using githubproj.Models;
using githubproj.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using githubproj.Exceptions;
using System.Threading.Tasks;

namespace githubproj.Controllers
{
    public class HomeController : Controller
    {
        #region services
        private readonly IRepoService _repoService;
        private readonly IOwnerRepository _ownerService;
        #endregion

        #region constructor
        public HomeController(IRepoService repoService, IOwnerRepository ownerService)
        {
            _repoService = repoService;
            _ownerService = ownerService;
        }

        #endregion

        #region actions
        public IActionResult Index(string searchString, string own)
        {

            RepoViewModel repos = new RepoViewModel();

            if (string.IsNullOrEmpty(searchString))
            {
                Array values = Enum.GetValues(typeof(Langs));
                Random random = new Random();
                Langs randomLang = (Langs)values.GetValue(random.Next(values.Length));
                searchString = randomLang.ToString();
            }   

            if (!string.IsNullOrEmpty(own))
            {
                repos = PrepareModelOwn(searchString);
                return View(repos);
            }

            try
            {
                HttpResponseMessage response = _repoService.GetByDescription(searchString).Result;
                if (response.IsSuccessStatusCode)
                    repos = response.Content.ReadAsAsync<RepoViewModel>().Result;
                else
                    RedirectToAction("Error");
            }
            catch (Exception ex)
            {
                TempData["Message"] = ex.InnerException.Message;
            }            

            return View(repos);
        }

        public IActionResult Details(string url)
        {
            HttpResponseMessage response = _repoService.GetByUrl(url).Result;
            DetailsViewModel repo = new DetailsViewModel();

            if (response.IsSuccessStatusCode)
                repo = response.Content.ReadAsAsync<DetailsViewModel>().Result;
            else
                RedirectToAction("Error");

            _repoService.SaveRepo(repo);

            return View(repo);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        #endregion

        #region privates
        private RepoViewModel PrepareModelOwn(string searchString)
        {
            RepoViewModel model = new RepoViewModel();
            try
            {
                IList<Repo> repos = _repoService.Search(searchString);
                model.total_count = repos.Count();
                foreach (var item in repos)
                {
                    RepoItemDetails itemModel = new RepoItemDetails();
                    itemModel.created_at = item.created_at;
                    itemModel.description = item.description;
                    itemModel.full_name = item.full_name;
                    itemModel.git_url = item.git_url;
                    itemModel.id = item.id;
                    itemModel.name = item.name;
                    Repo.Owner owner = _ownerService.Find(item.ownerid);
                    itemModel.owner = new Owner { id = owner.id, avatar_url = owner.avatar_url, login = owner.login };
                    itemModel.url = item.url;
                    model.items.Add(itemModel);
                }
            }
            catch (RepoNotFoundException ex)
            {
                TempData["Message"] = ex.Message;
            }
            catch (Exception)
            {
                RedirectToAction("Error");
            }
            
            return model;
        }
        #endregion
    }
}
