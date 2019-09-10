using System;
using GitInsights.Models.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using NToastNotify;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Database;
using Domain.Entities;
using GitInsights.Utils;

namespace GitInsights.Controllers
{
	public class AccountController : Controller
    {
		private readonly GitInsightsDbContext _context;
		private readonly IToastNotification ToastNotification;
		public AccountController(GitInsightsDbContext context, IToastNotification toastNotification)
		{
			_context = context;
			ToastNotification = toastNotification;
		}

		[AllowAnonymous]
		public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public IActionResult Register(RegisterViewModel register)
        {
			if (!ModelState.IsValid) return View(register);

            var user = _context.Users.Where(
                u => u.Email.ToUpperInvariant().Equals(register.Email.ToUpperInvariant(), StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();

            if (user != null)
            {
                ToastNotification.AddErrorToastMessage("Email already taken!");
                return View(register);
            }

            var salt = Helpers.CreateHash(Helpers.GenerateString(50));

            user = new User(register.Name, register.Email, HashPassword(salt, register.Password), salt);

            _context.Users.Add(user);

            _context.SaveChanges();

            return RedirectToAction("Login");
        }

        [AllowAnonymous]
		public IActionResult Login()
		{
			if (User?.Identity.IsAuthenticated == true)
			{
				return RedirectToAction("Index", "Home");
			}
			
			return View();
		}

		[HttpPost]
		[AllowAnonymous]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Login(LoginViewModel login)
		{
			if (!ModelState.IsValid) return View(login);
			
			var user = _context.Users.Where(u => u.Email.Equals(login.Email, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();

			if (user == null)
			{
				ToastNotification.AddErrorToastMessage("User not found!");
				return View(login);
			}

			if (!VerifyPassword(user, login))
			{
				ToastNotification.AddErrorToastMessage("Invalid credentials!");
				return View(login);
			}

			var claims = new List<Claim>
			{
				new Claim("UserId", user.Id.ToString()),
				new Claim(ClaimTypes.Email, user.Email),
				new Claim(ClaimTypes.Name, user.Name),
				new Claim(ClaimTypes.Role, "User"),
			};

			var claimsIdentity = new ClaimsIdentity(
				claims, CookieAuthenticationDefaults.AuthenticationScheme);

			var authProperties = new AuthenticationProperties
			{
				IsPersistent = true,
			};

			await HttpContext.SignInAsync(
				CookieAuthenticationDefaults.AuthenticationScheme, 
				new ClaimsPrincipal(claimsIdentity), 
				authProperties);

			return RedirectToAction("Index", "Home");
		}

		[HttpPost] 
		public async Task<IActionResult> Logout()  
		{  
			await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);  
			return RedirectToAction("Login", "Account");  
		}
		
		[AllowAnonymous]
		public IActionResult ResetPassword()
		{
			return View();
		}

		[HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
		public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
		{
			if (!ModelState.IsValid) return View(model);

			var user = _context.Users.Where(u => u.Email.Equals(model.Email, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();

			if (user == null)
			{
				ToastNotification.AddErrorToastMessage("User not found!");
				return View(model);
			}

			var salt = Helpers.CreateHash(Helpers.GenerateString(50));

            user.Password = HashPassword(salt, model.Password);

			user.Salt = salt;

			user.UpdatedAt = DateTime.Now;

            _context.SaveChanges();

			await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return RedirectToAction("Login");
		}

		private string HashPassword(string salt, string password)
		{
			return Helpers.CreateHash(salt + password);
		}

		private bool VerifyPassword(User user, LoginViewModel login)
		{
			var hashedPassword = HashPassword(user.Salt, login.Password);

			return user.Password.Equals(hashedPassword);
		}
	}
}