using githubproj.Domain.Models;
using githubproj.Infrastructure.Repository.Interface;
using System.Linq;
using static githubproj.Domain.Models.Repo;

namespace githubproj.Infrastructure.Repository.Implementation
{
    public class OwnerRepository : IOwnerRepository
    {
        private readonly SqlContext _context;

        public OwnerRepository(SqlContext ctx)
        {
            _context = ctx;
        }

        public Owner Find(long id)
        {
            return _context.Owner.FirstOrDefault(r => r.id == id);
        }
    }
}
