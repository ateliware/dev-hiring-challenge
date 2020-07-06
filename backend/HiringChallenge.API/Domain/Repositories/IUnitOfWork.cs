using System;
using System.Threading.Tasks;

namespace HiringChallenge.API.Domain.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        Task SaveChangesAsync();
    }
}