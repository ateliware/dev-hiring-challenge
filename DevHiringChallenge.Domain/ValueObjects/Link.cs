using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevHiringChallenge.Domain.ValueObjects
{
    public class Link
    {
        public string Html_Url { get; set; }
        public string Url { get; set; }
        public string Followers_Url { get; set; }
        public string Following_Url { get; set; }
        public string Gists_Url { get; set; }
        public string Starred_Url { get; set; }
        public string Subscriptions_Url { get; set; }
        public string Organizations_Url { get; set; }
        public string Repos_Url { get; set; }
        public string Events_Url { get; set; }
        public string Avatar_Url { get; set; }
        public string Branches_Url { get; set; }
        public string Browser_Download_Url { get; set; }
        public string Received_Events_Url { get; set; }
    }
}
