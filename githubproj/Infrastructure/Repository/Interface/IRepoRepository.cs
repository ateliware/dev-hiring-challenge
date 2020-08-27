using githubproj.Domain.Models;
using System.Collections.Generic;

namespace githubproj.Infrastructure.Repository.Interface
{
    public interface IRepoRepository
    {
        void Add(Repo repo);
        IEnumerable<Repo> GetAll();
        Repo Find(long id);
        void Remove(long id);
        void Update(Repo user);
    }
}
