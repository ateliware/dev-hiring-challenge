using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;

namespace DataImporter.Interfaces
{
    public interface IGithubQuerier
    {
        Task<IEnumerable<Repository>> FetchRepositoriesAsync(Language language);
    }
}