using Microsoft.AspNetCore.Mvc;
using AteliwareGitHub.Shared;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System;
using AteliwareGitHub.Server.Core.Interface;

namespace AteliwareGitHub.Server.Controllers
{
    [Route("api/[controller]")]
    public class GitHubController : Controller
    {
        private const string requestRepos = "/search/repositories";

        public IHttpClientFactory _clientFactory { get; set; }
        public IGitHubService _githubSession { get; set; }

        public GitHubController(IHttpClientFactory clientFactory, IGitHubService githubSession)
        {
            _clientFactory = clientFactory;
            _githubSession = githubSession;
            githubSession.httpclientFactory = _clientFactory;
        }

        [HttpGet("[action]")]
        public Task<IEnumerable<LanguagesDTO>> Languages ()
        {
            return _githubSession.Languages();
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GitRepositories ( [FromQuery] string[] lang )
        {
            List<GitRepoDTO> listRepos = new List<GitRepoDTO>();

            try
            {
                var client = _clientFactory.CreateClient("github");

                foreach (var lng in lang)
                {
                    var response = await client.GetAsync(requestRepos + $"?q=language:{lng}&sort=stars&order=desc");

                    response.EnsureSuccessStatusCode();

                    listRepos.Add(await response.Content.ReadAsAsync<GitRepoDTO>());
                }

                List<Item> listItems = new List<Item>();

                //Record this repo infos in database using EF
                using (var db = new AteliwareContext())
                {
                    //Get All repos items separately
                    foreach (var repoUnit in listRepos)
                        foreach (var itemUnit in repoUnit.items)
                        {
                            listItems.Add(itemUnit);
                        }
                    //Get just repos which are not in DB
                    var notindbYet = from b in listItems
                                     where !(from c in db.GitRepositories
                                             select c.gitID)
                                               .Contains(b.id)
                                     select b;
                    foreach (var recRepo in notindbYet)
                    {

                        GitRepos lnewrepo = new GitRepos()
                        {
                            gitID = recRepo.id,
                            description = recRepo.description,
                            name = recRepo.name,
                            SearchDate = DateTime.Now,
                            stars = recRepo.stargazers_count,
                            url = recRepo.html_url,
                            language = recRepo.language
                        };

                        db.GitRepositories.Add(lnewrepo);

                        await db.SaveChangesAsync();
                    }
                }

            }
            catch ( HttpRequestException exc )
            {
                return BadRequest(exc.Message);
            }

            return Ok(listRepos);
        }

        [HttpGet("[action]")]
        public IActionResult RepositoryDetails(int id)
        {
            GitRepos litem;

            try
            {
                using (var db = new AteliwareContext())
                {
                    var lrepo = from b in db.GitRepositories
                                where b.gitID == id
                                select new GitRepos()
                                {
                                    description = b.description,
                                    gitID = b.gitID,
                                    language = b.language,
                                    name = b.name,
                                    SearchDate = b.SearchDate,
                                    stars = b.stars,
                                    url = b.url
                                };

                    litem = lrepo.FirstOrDefault();
                }
            }
            catch (HttpRequestException exc)
            {
                return BadRequest(exc.Message);
            }

            return Ok(litem);

        }
    }
}