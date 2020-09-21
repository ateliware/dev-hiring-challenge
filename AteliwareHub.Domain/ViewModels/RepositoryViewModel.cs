using System;
using System.Collections.Generic;
using System.Text;

namespace AteliwareHub.Domain.ViewModels
{
    public class RepositoryViewModel
    {
        public int RepositoryId { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public UserViewModel Owner { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string Language { get; set; }
        public int Stars { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime LastUpdate { get; set; }
    }
}
