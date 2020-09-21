using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AteliwareHub.Web.Models;
using AteliwareHub.Domain.Contracts;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace AteliwareHub.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IRepositoryService _repositoryService;

        public HomeController(ILogger<HomeController> logger, IRepositoryService repositoryService)
        {
            _logger = logger;
            _repositoryService = repositoryService;

        }

        public async Task<IActionResult> Index()
        {
            var list = await _repositoryService.GetTopsFromLanguageAsync("java");

            ViewBag.List = _repositoryService
                            .GetLanguages()
                            .Select(a => 
                                        new SelectListItem(){ 
                                            Text = a, 
                                            Value = a
                                        }).ToList();
            return View();
        }

        public async Task<IActionResult> Details(int repositoryId)
        {
            var repository = await _repositoryService.GetAsync(repositoryId);

            return View(repository);
        }

        public async Task<IActionResult> TopRepositories(string language)
        {

            var list = await _repositoryService.GetTopsFromLanguageAsync(language);

            return View(list);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
