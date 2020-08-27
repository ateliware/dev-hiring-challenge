using githubproj.Domain.Models;
using githubproj.Models;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace githubproj.Services.Interface
{
    public interface IRepoService
    {
        void SaveRepo(DetailsViewModel repo);
        IList<Repo> Search(string searchString);
        Task<HttpResponseMessage> GetByUrl(string url);
        Task<HttpResponseMessage> GetByDescription(string searchString);
    }
}
