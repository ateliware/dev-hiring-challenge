using System;
using DevHiringChallenge.Domain.Entities;

namespace DevHiringChallenge.Domain.Results
{
    public class GitHubResult
    {
        public int Id { get; set; }
        public string Node_Id { get; set; }
        public string Name { get; set; }
        public string Full_Name { get; set; }
        public string Description { get; set; }
        public bool Fork { get; set; }
        public string Pushed_At { get; set; }
        public string Created_At { get; set; }
        public string Updated_At { get; set; }
        public int Size { get; set; }
        public string Content_Type { get; set; }
        public string State { get; set; }
        public string Label { get; set; }
        public OwnerResult Owner { get; set; }
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