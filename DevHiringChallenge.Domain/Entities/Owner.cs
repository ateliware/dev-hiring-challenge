using System;
using DevHiringChallenge.Domain.ValueObjects;

namespace DevHiringChallenge.Domain.Entities
{
    public class Owner
    {
        public Guid Codigo { get; set; }
        public string Login { get; set; }
        public int Id { get; set; }
        public string Node_Id { get; set; }
        public string Avatar_Url { get; set; }
        public string Gravatar_Id { get; set; }
        public string Type { get; set; }
        public bool Site_Admin { get; set; }
        public Link Url { get; set; }
        public Link Html_Url { get; set; }
        public Link Followers_Url { get; set; }
        public Link Following_Url { get; set; }
        public Link Gists_Url { get; set; }
        public Link Starred_Url { get; set; }
        public Link Subscriptions_Url { get; set; }
        public Link Organizations_Url { get; set; }
        public Link Repos_Url { get; set; }
        public Link Events_Url { get; set; }
        public Link Received_Events_Url { get; set; }
    }
}
