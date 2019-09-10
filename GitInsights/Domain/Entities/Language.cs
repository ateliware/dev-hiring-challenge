using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Language
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string QueryName { get; set; }
        public DateTime LastUpdate { get; set; }
        public ICollection<Repository> Repositories { get; set; }

        public Language()
        {

        }

        public Language(string name, string queryName)
        {
            Name = name;
            QueryName = queryName;
        }
        public Language(int id, string name, string queryName)
        {
            Id = id;
            Name = name;
            QueryName = queryName;
        }
    }
}