using System.Collections.Generic;

namespace DataImporter.Models
{
    public class Response
    {
        public int TotalCount { get; set; }
        public IEnumerable<Item> Items { get; set; }
    }
}