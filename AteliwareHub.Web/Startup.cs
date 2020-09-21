using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AteliwareHub.Domain.Context;
using AteliwareHub.Domain.Contracts;
using AteliwareHub.Infra;
using AteliwareHub.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace AteliwareHub.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string connectionString = Configuration["ConnectionStrings:AteliwareConnection"];
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connectionString));

            services.AddControllersWithViews();
            services.AddSingleton(Configuration);
            services.AddTransient<GitRepository>();
            services.AddTransient<IRepositoryService, RepositoryService>();
            services.AddMvc();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider services)
        {
            var context = services.GetRequiredService<ApplicationContext>();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });


            if ((Configuration["INITDB"] ?? "false") == "true")
            {
                System.Console.WriteLine("Preparing Database...");

                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                System.Console.WriteLine("Database Preparation Complete");

            }

            try
            {
                context.Database.EnsureCreated();
            }catch(Exception e)
            {
                System.Console.WriteLine(e.Message);
            }
        }
    }
}
