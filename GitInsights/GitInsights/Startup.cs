using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.Cookies;
using NToastNotify;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Database;
using DataImporter.Services;
using DataImporter.Interfaces;

namespace GitInsights
{
    public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services)
		{
			services.Configure<CookiePolicyOptions>(options =>
			{
				options.CheckConsentNeeded = context => true;
				options.MinimumSameSitePolicy = SameSiteMode.None;
			});

			services.AddDbContext<GitInsightsDbContext>();

			services.AddScoped<IGithubQuerier, GithubQuerier>();

			services.AddMvc(options =>
			{
				var policyAuthAllControllers = new AuthorizationPolicyBuilder()
					.RequireAuthenticatedUser()
					.Build();

				options.Filters.Add(new AuthorizeFilter(policyAuthAllControllers));
			})
				.SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
				.AddNToastNotifyToastr(new ToastrOptions
				{
					ProgressBar = false,
					PositionClass = ToastPositions.TopCenter,
					TimeOut = 3000
				});

			services.ConfigureApplicationCookie(options =>
			{
				options.Cookie.MaxAge = TimeSpan.FromMinutes(30);

				options.AccessDeniedPath = "/Account/AccessDenied";

				options.Cookie.Expiration = TimeSpan.FromHours(2);

				options.ExpireTimeSpan = TimeSpan.FromHours(2);

				options.LoginPath = "/Account/Login";

				options.ReturnUrlParameter = CookieAuthenticationDefaults.ReturnUrlParameter;

				options.SlidingExpiration = true;
			});

			services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    				.AddCookie();
		}

		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			using (var serviceScope = app.ApplicationServices
				.GetRequiredService<IServiceScopeFactory>()
				.CreateScope())
			{
				using (var context = serviceScope.ServiceProvider.GetService<GitInsightsDbContext>())
				{
					context.Database.Migrate();
				}
			}
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseDatabaseErrorPage();
			}
			else
			{
				app.UseExceptionHandler("/Home/Error");
				app.UseHsts();
			}

			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseCookiePolicy();

			app.UseAuthentication();

			app.UseNToastNotify();

			app.UseMvc(routes =>
			{
				routes.MapRoute(
					name: "default",
					template: "{controller=Home}/{action=Index}/");
			});
		}
	}
}
