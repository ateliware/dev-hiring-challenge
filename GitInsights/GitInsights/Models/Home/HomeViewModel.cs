using System.Collections.Generic;
using System.ComponentModel;
using Domain.Entities;

namespace GitInsights.Models.Home
{
    public class HomeViewModel
    {
        [DisplayName("Language")]
        public int LanguageFilter { get; set; }
        [DisplayName("Topic")]
        public List<Repository> Repositories { get; set; }
    }
}