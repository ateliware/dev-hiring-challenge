using Hiring.Challenge.Domain.Models;
using Hiring.Challenge.Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hiring.Challenge.Infrastructure.Extensions
{
    public static class MapperExtensions
    {
        public static RepositoryViewModel ToViewModel(this Repository model)
        {
            return new RepositoryViewModel
            {
                CreateDate = model.CreateDate,
                Description = model.Description,
                FullName = model.FullName,
                Id = model.Id,
                Language = model.Language,
                LastUpdate = model.LastUpdate,
                Name = model.Name,
                Stars = model.Stars,
                Owner = model.Owner?.ToViewModel(),
                Url = model.Url
            };
        }

        public static UserViewModel ToViewModel(this User model)
        {
            return new UserViewModel
            {
                Id = model.Id,
                ImageUrl = model.ImageUrl,
                Url = model.Url,
                Username = model.Username
            };
        }
    }
}
