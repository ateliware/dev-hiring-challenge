using AteliwareHub.Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AteliwareHub.Domain.Contracts
{
    public interface IRepositoryService
    {
        public Task<IEnumerable<RepositoryViewModel>> GetTopsFromLanguageAsync(string lang);
        public IEnumerable<string> GetLanguages();
        public Task<RepositoryViewModel> GetAsync(int id);
    }
}
