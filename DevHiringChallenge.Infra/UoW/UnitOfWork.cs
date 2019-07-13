using DevHiringChallenge.Infra.DataContexts;

namespace DevHiringChallenge.Infra.UoW
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
