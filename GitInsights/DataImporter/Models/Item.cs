using Newtonsoft.Json;

namespace DataImporter.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Owner Owner { get; set; }
        [JsonProperty("html_url")]
        public string HtmlUrl { get; set; }
        public string Description { get; set; }
        [JsonProperty("created_at")]
        public string CreatedAt { get; set; }
        [JsonProperty("updated_at")]
        public string UpdatedAt { get; set; }
        [JsonProperty("stargazers_count")]
        public int StargazersCount { get; set; }
        public string Language { get; set; }
        public License License { get; set; }
        public int Forks { get; set; }
    }
}