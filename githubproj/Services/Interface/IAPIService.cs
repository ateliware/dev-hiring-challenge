using System.Net.Http;
using System.Threading.Tasks;

namespace githubproj.Services.Interface
{
    public interface IAPIService
    {
        Task<HttpResponseMessage> getByDescription(string searchString);
        Task<HttpResponseMessage> getByUrl(string url);
    }
}
