using GitInsights.Models.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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
		public async Task<IActionResult> Register(RegisterViewModel register)
		{
			if (!PasswordsMatch(register.Password, register.ConfirmPassword)) return View(register);

			var newUser = new IdentityUser(register.UserName)
			{
				Email = register.Email,

				EmailConfirmed = true
			};

			var createUser = await _userManager.CreateAsync(newUser);

			if (createUser.Succeeded)
			{
				var token = await _userManager.GeneratePasswordResetTokenAsync(newUser);

				await _userManager.ResetPasswordAsync(newUser, token, register.Password);
			}

			return View();
		}

		public bool PasswordsMatch(string password, string confirmPassword)
		{
			return password.Equals(confirmPassword);
		}

		public IActionResult Login()
		{
			return View();
		}

	}
}