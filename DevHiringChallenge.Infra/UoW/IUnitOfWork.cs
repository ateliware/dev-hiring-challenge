using System;

namespace DevHiringChallenge.Infra.UoW
{
    public interface IUnitOfWork : IDisposable
    {
        void BeginTransaction();
        void Commit();
        void Rollback();

    }
}