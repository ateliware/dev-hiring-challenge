using System;
using System.ComponentModel.DataAnnotations;

namespace Hiring.Challenge.Domain.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Username { get; set; }
        public string ImageUrl { get; set; }
        public string Url { get; set; }
    }
}
