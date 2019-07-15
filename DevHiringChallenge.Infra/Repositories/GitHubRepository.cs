using Dapper;
using DevHiringChallenge.Domain.Entities;
using DevHiringChallenge.Domain.Repositories;
using DevHiringChallenge.Infra.DataContexts;
using System;

namespace DevHiringChallenge.Infra.Repositories
{
    public class GitHubRepository : IGitHubRepository
    {
        private readonly DataContext _context;

        public GitHubRepository(DataContext context)
            => _context = context;

        public void Gravar(GitHub gitHub)
        {
            try
            {
                var sql = $"Inter Into GitHub () Values()";
                
                _context.Connection.Execute(sql);
            }
            catch (Exception ex)
            {
               throw new Exception($"Não foi possível gravar o owner! Exception {ex}");
            }
        }

        public void GravarOwner(Owner owner)
        {
            try
            {
                var sql = $"Inter Into Owner () Values()";

                _context.Connection.Execute(sql);
            }
            catch (Exception ex)
            {
               throw new Exception($"Não foi possível gravar o owner! Exception {ex}");
            }
        }
    }
}
