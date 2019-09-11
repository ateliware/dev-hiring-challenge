using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace GitInsights
{
    public class Program
	{
		public static void Main(string[] args)
		{
			CreateWebHostBuilder(args).Build().Run();
		}

		public static IWebHostBuilder CreateWebHostBuilder(string[] args)
		{
			var port = Environment.GetEnvironmentVariable("PORT");

			return WebHost.CreateDefaultBuilder(args)
				.UseStartup<Startup>()
				.UseUrls("http://*:"+port);
		}
	}
}
