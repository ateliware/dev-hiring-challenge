using Hiring.Challenge.Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hiring.Challenge.Domain.Interfaces
{
    public interface IRepositoryService
    {
        public ValueTask<RepositoryViewModel> GetAsync(Guid id);
        public IEnumerable<string> GetLanguages();
        public ValueTask<IEnumerable<RepositoryViewModel>> GetTopRepositoriesFromLanguageAsync(string language);
            
    }
}
