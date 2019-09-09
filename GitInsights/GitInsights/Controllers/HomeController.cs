using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using GitInsights.Models;
using Microsoft.AspNetCore.Authorization;
using NToastNotify;
using Database;
using DataImporter.Interfaces;
using System.Threading.Tasks;
using GitInsights.Models.Home;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace GitInsights.Controllers
{
	[Authorize]
    public class HomeController : Controller
	{
		private readonly GitInsightsDbContext _context;
		private readonly IGithubQuerier _githubQuerier;
		private readonly Dictionary<string,string> Languages; 
		protected readonly IToastNotification ToastNotification;

		public HomeController(GitInsightsDbContext context, IToastNotification toastNotification, IGithubQuerier githubQuerier)
		{
			_context = context;
			_githubQuerier = githubQuerier;
			ToastNotification = toastNotification;
			Languages = new Dictionary<string, string>
			{
				{ "C#", "csharp" },
				{ "Ruby", "ruby" },
				{ "Elixir", "elixir" },
				{ "C", "c"},
				{ "Go", "go" },
				{ "Python", "python" },
				{ "Java", "java" },
				{ "JavaScript", "javascript" }
			};
		}
		public async Task<IActionResult> Index(HomeViewModel model)
		{
			if (string.IsNullOrEmpty(model.LanguageFilter))
			{
				ViewBag.LanguagesList = new SelectList((IEnumerable)Languages, "Key", "Value");
			}
			else
			{
				ViewBag.LanguagesList = new SelectList((IEnumerable)Languages, "Key", "Value", model.LanguageFilter);
			}

			return View();
		}

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}
	}
}
