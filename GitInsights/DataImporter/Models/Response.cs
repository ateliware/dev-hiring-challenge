using System.Collections.Generic;
using Newtonsoft.Json;

namespace DataImporter.Models
{
    public class Response
    {
        [JsonProperty("total_count")]
        public int TotalCount { get; set; }
        public IEnumerable<Item> Items { get; set; }
    }
}