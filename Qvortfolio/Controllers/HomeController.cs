using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Octokit;
using Qvortfolio.Models;
using System.Diagnostics;


namespace Qvortfolio.Controllers
{
    public class HomeController : Controller
    {
        private readonly IGitHubClient _githubClient;
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger, IGitHubClient githubClient)
        {
            _logger = logger;
            _githubClient = githubClient;
        }

        public async Task<IActionResult> Index()
        {
   //         var configuration = new ConfigurationBuilder()
   //.SetBasePath(Directory.GetCurrentDirectory())
   //.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
   //.Build();
   //         var client = new GitHubClient(new ProductHeaderValue("Qvortfolio"));
   //         var basicAuth = new Credentials(configuration["GitHub:Username"], configuration["Github:Password"]);
   //         client.Credentials = basicAuth;
   //         //getting user repositories.
   //         var repositories = await client.Repository.GetAllForUser("Qvabby");
   //         //turning them into viewmodels
   //         var repositoryModels = repositories.Select(r => new GithubRepositoryViewModel
   //         {
   //             Name = r.Name,
   //             Description = r.Description,
   //             HtmlUrl = r.HtmlUrl
   //         }).ToList();
            //return View(repositoryModels);
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = System.Diagnostics.Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        public IActionResult CV()
        {
            return View();
        }
        public IActionResult AboutMe()
        {
            return View();
        }
        public IActionResult PublishedWorks()
        {
            return View();
        }
        public IActionResult Contact()
        {
            return View();
        }
        public async Task<IActionResult> GithubRepositories()
        {
            var configuration = new ConfigurationBuilder()
   .SetBasePath(Directory.GetCurrentDirectory())
   .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
   .Build();
            var client = new GitHubClient(new ProductHeaderValue("Qvortfolio"));
            var basicAuth = new Credentials(configuration["GitHub:Username"], configuration["Github:Password"]);
            client.Credentials = basicAuth;
            //getting user repositories.
            var repositories = await client.Repository.GetAllForUser("Qvabby");
            //turning them into viewmodels
            var repositoryModels = repositories.Select(r => new GithubRepositoryViewModel
            {
                Name = r.Name,
                Description = r.Description,
                HtmlUrl = r.HtmlUrl
            }).ToList();
            return View(repositoryModels);
        }
    }
}
