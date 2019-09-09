using Newtonsoft.Json;

namespace DataImporter.Models
{
    public class Owner
    {
        public int Id { get; set; }
        public string Login { get; set; }
        [JsonProperty("avatar_url")]
        public string AvatarUrl { get; set; }
        [JsonProperty("html_url")]
        public string HtmlUrl { get; set; }
    }
}