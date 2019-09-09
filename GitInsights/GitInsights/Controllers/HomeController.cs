using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using GitInsights.Models;
using Microsoft.AspNetCore.Authorization;
using NToastNotify;
using Database;
using DataImporter.Interfaces;
using System.Threading.Tasks;

namespace GitInsights.Controllers
{
	[Authorize]
    public class HomeController : Controller
	{
		private readonly GitInsightsDbContext _context;
		private readonly IGithubQuerier _githubQuerier;
		protected readonly IToastNotification ToastNotification;

		public HomeController(GitInsightsDbContext context, IToastNotification toastNotification, IGithubQuerier githubQuerier)
		{
			_context = context;
			_githubQuerier = githubQuerier;
			ToastNotification = toastNotification;
		}
		public async Task<IActionResult> Index()
		{
			var x = await _githubQuerier.FetchRepositoriesAsync("csharp", null);

			return View();
		}

		public IActionResult Privacy()
		{
			return View();
		}

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}
	}
}
