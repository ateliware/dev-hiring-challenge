using DevHiringChallenge.Domain.Interfaces;
using DevHiringChallenge.Infrastructure.DataContexts;

namespace DevHiringChallenge.Infrastructure.UoW
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _dataContext;

        public UnitOfWork(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void BeginTransaction()
        {
            _dataContext.BeginTransaction();
        }

        public void Commit()
        {
            _dataContext.Commit();
        }

        public void Rollback()
        {
            _dataContext.Rollback();
        }

        public void Dispose()
        {
            _dataContext.Dispose();
        }
    }
}