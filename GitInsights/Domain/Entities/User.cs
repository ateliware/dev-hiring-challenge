using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public User()
        {
            
        }
        public User(string name, string email, string password, string salt)
        {
            Name = name;
            Email = email;
            Password = password;
            Salt = salt;
            CreatedAt = DateTime.Now;
        }
    }
}