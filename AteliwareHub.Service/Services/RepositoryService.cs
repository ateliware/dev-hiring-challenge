using AteliwareHub.Domain.Context;
using AteliwareHub.Domain.Contracts;
using AteliwareHub.Domain.ViewModels;
using AteliwareHub.Infra;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AteliwareHub.Service
{
    public class RepositoryService : IRepositoryService
    {
        private readonly ApplicationContext _context;
        private readonly GitRepository _gitRepository;

        public RepositoryService(ApplicationContext context, GitRepository gitRepository)
        {
            _context = context;
            _gitRepository = gitRepository;
        }

        public async Task<RepositoryViewModel> GetAsync(int id)
        {
            var repository = await _context.Repositories.Include(r => r.Owner).FirstOrDefaultAsync( x => x.RepositoryId == id);

            var repositoryViewModel = repository?.ToViewModel;
            return repositoryViewModel;
        }

        public IEnumerable<string> GetLanguages()
        {
            return _gitRepository.GetLanguages();
        }

        public async Task<IEnumerable<RepositoryViewModel>> GetTopsFromLanguageAsync(string language)
        {
            var repo = await _context.Repositories.Where(a => a.Language == language).ToListAsync();

            bool langStored = repo.Any();

            if (!(langStored))
            {
                repo = await _gitRepository.GetTopsFromLanguageAsync(language);

                await _context.Repositories.AddRangeAsync(repo);
                await _context.SaveChangesAsync();
            }

            var result = repo.Select(a => a.ToViewModel);

            return result;
        }

    }
}
