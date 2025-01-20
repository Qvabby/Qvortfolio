using Microsoft.AspNetCore.Cors.Infrastructure;
using Octokit;

namespace Qvortfolio
{

    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();


            var configuration = new ConfigurationBuilder()
   .SetBasePath(Directory.GetCurrentDirectory())
   .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
   .Build();
            builder.Services.AddTransient<IGitHubClient>(provider =>
            {
                var configuration = provider.GetService<IConfiguration>();
                var client = new GitHubClient(new ProductHeaderValue("Qvortfolio"));
                var basicAuth = new Credentials(configuration["GitHub:Username"], configuration["Github:Password"]);
                client.Credentials = basicAuth;
                return client;
            });

            //var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
            //builder.Services.AddCors(options =>
            //{
            //    options.AddPolicy(name: MyAllowSpecificOrigins,
            //                      policy =>
            //                      {
            //                          policy.WithOrigins("https://qvabit-001-site1.ptempurl.com/",
            //                                              "https://qvabit-001-site1.ptempurl.com/CV")
            //                          .WithMethods("PUT", "DELETE", "GET");

            //                      });
            //});
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder => builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            //app.UseHttpsRedirection();
            //app.UseCors(MyAllowSpecificOrigins);
            app.UseCors("AllowAll");

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }
    }
}
