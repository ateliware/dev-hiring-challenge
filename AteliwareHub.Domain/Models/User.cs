using AteliwareHub.Domain.ViewModels;
using System.ComponentModel.DataAnnotations.Schema;

namespace AteliwareHub.Domain
{
    public class User
    {
        public int UserId { get; set; }

        public string UserName { get; set; }

        public string ImageUrl { get; set; }
        public string Url { get; set; }

        public UserViewModel ToViewModel
        {
            get => new UserViewModel
            {
                UserId = UserId,
                UserName = UserName,
                ImageUrl = ImageUrl,
                Url = Url
            };
        }
    }
}