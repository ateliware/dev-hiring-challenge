using HiringChallenge.API.Domain.Context;

namespace HiringChallenge.API.Data.Repository
{
    public abstract class BaseRepository
    {
        protected readonly AppDbContext _context;

        public BaseRepository(AppDbContext context)
        {
            _context = context;
        }
    }
}