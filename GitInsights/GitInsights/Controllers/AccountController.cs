using GitInsights.Models.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GitInsights.Controllers
{
	public class AccountController : Controller
    {
		private readonly SignInManager<IdentityUser> _signInManager;
		private readonly UserManager<IdentityUser> _userManager;

		public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
		{
			_signInManager = signInManager;
			_userManager = userManager;
		}

		public IActionResult Register()
        {
            return View();
        }

		[HttpPost]
		[ValidateAntiForgeryToken]
		public IActionResult Register(RegisterViewModel user)
		{
			

			return View();
		}

		public IActionResult Login()
		{
			return View();
		}

	}
}