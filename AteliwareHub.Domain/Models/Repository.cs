using AteliwareHub.Domain.ViewModels;
using System;

namespace AteliwareHub.Domain
{
    public class Repository
    {
        public int RepositoryId { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }

        public User Owner { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string Language { get; set; }
        public int Stars { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime LastUpdate { get; set; }

        public RepositoryViewModel ToViewModel
        {
            get => new RepositoryViewModel
            {
                CreateDate = CreateDate,
                Description = Description,
                FullName =FullName,
                RepositoryId = RepositoryId,
                Language = Language,
                LastUpdate = LastUpdate,
                Name = Name,
                Stars = Stars,
                Owner = Owner?.ToViewModel,
                Url = Url
            };
        }

    }
}
