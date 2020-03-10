using DevHiringChallenge.Domain.Entities;
using System;

namespace DevHiringChallenge.Domain.Repositories
{
    public interface IGitHubRepository
    {
        void GravarOwner(Owner owner, Guid codigoOwner);
        void Gravar(GitHub gitHub, Guid codigoOwner);
    }
}
