using System;
using DevHiringChallenge.Domain.Entities;

namespace DevHiringChallenge.Domain.Repositories
{
    public interface IGitHubRepository
    {
        void GravarOwner(Owner owner, Guid codigoOwner);
        void Gravar(GitHub gitHub, Guid codigoOwner);
    }
}
