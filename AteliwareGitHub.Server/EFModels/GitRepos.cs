using System;
namespace AteliwareGitHub.Server
{
    public class GitRepos
    {
        public int id { get; set; }
        public int gitID { get; set; }
        public string name { get; set; }
        public int stars { get; set; }
        public string description { get; set; }
        public string url { get; set; }
        public DateTime SearchDate { get; set; }
        public string language { get; set; }
    }
}
