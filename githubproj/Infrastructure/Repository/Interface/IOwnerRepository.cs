using static githubproj.Domain.Models.Repo;

namespace githubproj.Infrastructure.Repository.Interface
{
    public interface IOwnerRepository
    { 
        Owner Find(long id);
    }
}
