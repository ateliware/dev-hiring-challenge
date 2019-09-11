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
            ValidateStringParams(name, queryName);
            Name = name;
            QueryName = queryName;
        }
        public Language(int id, string name, string queryName)
        {
            ValidateStringParams(name, queryName);
            if (id <= 0)
            {
                throw new ArgumentException("Invalid parameter!", "Id");
            }
            Id = id;
            Name = name;
            QueryName = queryName;
        }

        private void ValidateStringParams(string name, string queryName)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("Invalid parameter!", "Name");
            }

            if (string.IsNullOrWhiteSpace(queryName))
            {
                throw new ArgumentException("Invalid parameter!", "QueryName");
            }
        }
    }
}