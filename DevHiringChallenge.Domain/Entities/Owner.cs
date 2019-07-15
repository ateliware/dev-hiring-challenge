using System;

namespace DevHiringChallenge.Domain.Entities
{
    public class Owner
    {
        public Owner(string login, int id, string nodeId, string avatarUrl, string gravatarId, string type, bool siteAdmin, string url, string htmlUrl, string followersUrl, string followingUrl, string gistsUrl, string starredUrl, string subscriptionsUrl, string organizationsUrl, string reposUrl, string eventsUrl, string receivedEventsUrl)
        {
            Codigo = new Guid();
            Login = login;
            Id = id;
            Node_Id = nodeId;
            Avatar_Url = avatarUrl;
            Gravatar_Id = gravatarId;
            Type = type;
            Site_Admin = siteAdmin;
            Url = url;
            Html_Url = htmlUrl;
            Followers_Url = followersUrl;
            Following_Url = followingUrl;
            Gists_Url = gistsUrl;
            Starred_Url = starredUrl;
            Subscriptions_Url = subscriptionsUrl;
            Organizations_Url = organizationsUrl;
            Repos_Url = reposUrl;
            Events_Url = eventsUrl;
            Received_Events_Url = receivedEventsUrl;
        }

        public Guid Codigo { get; set; }
        public string Login { get; set; }
        public int Id { get; set; }
        public string Node_Id { get; set; }
        public string Avatar_Url { get; set; }
        public string Gravatar_Id { get; set; }
        public string Type { get; set; }
        public bool Site_Admin { get; set; }
        public string Url { get; set; }
        public string Html_Url { get; set; }
        public string Followers_Url { get; set; }
        public string Following_Url { get; set; }
        public string Gists_Url { get; set; }
        public string Starred_Url { get; set; }
        public string Subscriptions_Url { get; set; }
        public string Organizations_Url { get; set; }
        public string Repos_Url { get; set; }
        public string Events_Url { get; set; }
        public string Received_Events_Url { get; set; }
    }
}
