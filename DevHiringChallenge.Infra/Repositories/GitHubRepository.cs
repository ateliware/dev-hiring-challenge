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

        public void Gravar(GitHub gitHub, Guid codigoOwner)
        {
            try
            {
                var sql = $"Insert Into GitHub (CodigoGitHub, Id, Node_Id, Name, Full_Name, Description, Pushed_At, Created_At, Updated_At, Html_Url, CodigoOwner, Language) Values ('{gitHub.CodigoGitHub}', {gitHub.Id}, '{gitHub.Node_Id}', '{gitHub.Name}', '{gitHub.Full_Name}', '{gitHub.Description}', '{gitHub.Pushed_At}', '{gitHub.Created_At}', '{gitHub.Updated_At}', '{gitHub.Html_Url}', '{codigoOwner}', '{gitHub.Language}')";

                _context.Connection.Execute(sql);
            }
            catch (Exception ex)
            {
                throw new Exception($"Não foi possível gravar o owner! Exception {ex}");
            }
        }

        public void GravarOwner(Owner owner, Guid codigoOwner)
        {
            try
            {
                var sql = $"Insert Into Owner (Login, Id, Node_Id, Avatar_Url, Gravatar_Id, Type, Url, CodigoOwner) Values('{owner.Login}', {owner.Id}, '{owner.Node_Id}', '{owner.Avatar_Url}', '{owner.Gravatar_Id}', '{owner.Type}', '{owner.Url}', '{codigoOwner}')";

                _context.Connection.Execute(sql);
            }
            catch (Exception ex)
            {
                throw new Exception($"Não foi possível gravar o owner! Exception {ex}");
            }
        }
    }
}
