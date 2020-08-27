using githubproj.Domain.Models;
using githubproj.Infrastructure.Repository.Interface;
using System.Collections.Generic;
using System.Linq;

namespace githubproj.Infrastructure.Repository.Implementation
{
    public class RepoRepository : IRepoRepository
    {
        private readonly SqlContext _context;

        public RepoRepository(SqlContext ctx)
        {
            _context = ctx;
        }

        public void Add(Repo repo)
        {
            if (_context.Repo.FirstOrDefault(r => r.full_name == repo.full_name) == null) {
                _context.Add(repo);
                _context.SaveChanges();
            }
        }

        public Repo Find(long id)
        {
            return _context.Repo.FirstOrDefault(r => r.id == id);
        }

        public IEnumerable<Repo> GetAll()
        {
            return _context.Repo.ToList();
        }

        public void Remove(long id)
        {
            var entity = _context.Repo.First(r => r.id == id);
            _context.Repo.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(Repo user)
        {
            _context.Repo.Update(user);
            _context.SaveChanges();
        }
    }
}
