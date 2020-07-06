using System.Threading.Tasks;
using HiringChallenge.API.Domain.Context;
using HiringChallenge.API.Domain.Repositories;

namespace HiringChallenge.API.Data.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        }
        public void Dispose()
        {
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}