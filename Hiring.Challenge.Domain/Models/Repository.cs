using System;

namespace Hiring.Challenge.Domain.Models
{
    public class Repository
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        public string FullName { get; set; }
        public User Owner { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string Language { get; set; }
        public int Stars { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime LastUpdate { get; set; }
    }
}
