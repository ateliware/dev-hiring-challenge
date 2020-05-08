using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Threading.Tasks;
using System.Linq;
using Hiring.Challenge.Domain.Interfaces;
using System;

namespace Hiring.Challenge.Web.Controllers
{
    public class HomeController : Controller
    {
        readonly IRepositoryService _repositoryService;

        public HomeController(IRepositoryService repositoryService)
        {
            _repositoryService = repositoryService;
        }

        public IActionResult Index()
        {
            ViewBag.Languages = (_repositoryService.GetLanguages()).Select(x => new SelectListItem() { Text = x, Value = x }).ToList();

            return View();
        }

        [HttpGet("/{language}")]
        public async Task<IActionResult> List(string language)
        {
            var repositories = await _repositoryService.GetTopRepositoriesFromLanguageAsync(language);
            return View(repositories);
        }

        [HttpGet("/{language}/{id}")]
        public async Task<IActionResult> Info(string language, Guid id)
        {
            var repository = await _repositoryService.GetAsync(id);
            return View(repository);
        }
    }
}
