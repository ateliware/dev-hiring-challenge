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
using System.Linq;
using System;
using Domain.Entities;

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
		public async Task<IActionResult> Index(HomeViewModel model)
		{
			var languages = _context.Languages.OrderBy(l => l.Id).ToList();

			if (model.LanguageFilter <= 0)
			{
				ViewBag.LanguagesList = new SelectList(languages, "Id", "Name");
			}
			else
			{
				ViewBag.LanguagesList = new SelectList(languages, "Id", "Name", model.LanguageFilter);

				var langToQuery = languages.Where(l => l.Id == model.LanguageFilter).FirstOrDefault();

				var repos = new List<Repository>();

				if (langToQuery.LastUpdate == null)
				{
					var newRepos = await _githubQuerier.FetchRepositoriesAsync(langToQuery);

					repos = newRepos.ToList();

					_context.AddRange(newRepos);

					langToQuery.LastUpdate = DateTime.Now;

					_context.SaveChanges();
				}
				else if(DateTime.Now > langToQuery.LastUpdate.AddDays(1))
				{
					var newRepos = await _githubQuerier.FetchRepositoriesAsync(langToQuery);

					repos = newRepos.ToList();

					var oldRepos = _context.Repositories.Where(r => r.LanguageId == langToQuery.Id).ToList();

					_context.RemoveRange(oldRepos);

					_context.SaveChanges();

					_context.AddRange(newRepos);

					langToQuery.LastUpdate = DateTime.Now;

					_context.SaveChanges();
				}
				else
				{
					repos = _context.Repositories.Where(r => r.LanguageId == langToQuery.Id).ToList();
				}

				model.Repositories = repos.OrderBy(r => r.StargazersCount).ToList();
			}

			return View(model);
		}

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}
	}
}
