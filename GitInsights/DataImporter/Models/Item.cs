using System;

namespace DataImporter.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Owner Owner { get; set; }
        public string HtmlUrl { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int StargazersCount { get; set; }
        public string Language { get; set; }
        public License License { get; set; }
        public int Forks { get; set; }
    }
}