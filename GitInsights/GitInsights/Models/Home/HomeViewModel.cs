using System.Collections.Generic;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace GitInsights.Models.Home
{
    public class HomeViewModel
    {
        public string LanguageFilter { get; set; }
        public string TopicFilter { get; set; }
        public List<Repository> Repositories { get; set; }
    }
}