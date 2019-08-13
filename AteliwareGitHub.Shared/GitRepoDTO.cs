using System;
using System.Collections.Generic;

namespace AteliwareGitHub.Shared
{

    public class Owner
    {
        public string login { get; set; }
        public int id { get; set; }
        public string node_id { get; set; }
        public string avatar_url { get; set; }
        public string gravatar_id { get; set; }
        public string url { get; set; }
        public string received_events_url { get; set; }
        public string type { get; set; }
    }

    public class Item
    {
        public int id { get; set; }
        public string node_id { get; set; }
        public string name { get; set; }
        public string full_name { get; set; }
        public Owner owner { get; set; }
        public bool @private { get; set; }
        public string html_url { get; set; }
        public string description { get; set; }
        public bool fork { get; set; }
        public string url { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
        public DateTime pushed_at { get; set; }
        public string homepage { get; set; }
        public int size { get; set; }
        public int stargazers_count { get; set; }
        public int watchers_count { get; set; }
        public string language { get; set; }
        public int forks_count { get; set; }
        public int open_issues_count { get; set; }
        public string master_branch { get; set; }
        public string default_branch { get; set; }
        public double score { get; set; }
    }

    public class GitRepoDTO
    {

        public int total_count { get; set; }
        public bool incomplete_results { get; set; }
        public List<Item> items { get; set; }

    }
}
