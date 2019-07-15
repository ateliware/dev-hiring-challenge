using System;

namespace DevHiringChallenge.Domain.Entities
{
    public class GitHub
    {
        public GitHub(int id, string nodeId, string name, string fullName, string description, bool fork, string pushedAt, string createdAt, string updatedAt, int size, string contentType, string state, string label, Owner owner, string htmlUrl, string url, string followersUrl, string followingUrl, string gistsUrl, string starredUrl, string subscriptionsUrl, string organizationsUrl, string reposUrl, string eventsUrl, string avatarUrl, string branchesUrl, string browserDownloadUrl, string receivedEventsUrl)
        {
            Codigo = new Guid();
            Id = id;
            Node_Id = nodeId;
            Name = name;
            Full_Name = fullName;
            Description = description;
            Fork = fork;
            Pushed_At = pushedAt;
            Created_At = createdAt;
            Updated_At = updatedAt;
            Size = size;
            Content_Type = contentType;
            State = state;
            Label = label;
            Owner = owner;
            Html_Url = htmlUrl;
            Url = url;
            Followers_Url = followersUrl;
            Following_Url = followingUrl;
            Gists_Url = gistsUrl;
            Starred_Url = starredUrl;
            Subscriptions_Url = subscriptionsUrl;
            Organizations_Url = organizationsUrl;
            Repos_Url = reposUrl;
            Events_Url = eventsUrl;
            Avatar_Url = avatarUrl;
            Branches_Url = branchesUrl;
            Browser_Download_Url = browserDownloadUrl;
            Received_Events_Url = receivedEventsUrl;
        }

        public Guid Codigo { get; private set; }
        public int Id { get; private set; }
        public string Node_Id { get; private set; }
        public string Name { get; private set; }
        public string Full_Name { get; private set; }
        public string Description { get; private set; }
        public bool Fork { get; private set; }
        public string Pushed_At { get; private set; }
        public string Created_At { get; private set; }
        public string Updated_At { get; private set; }
        public int Size { get; private set; }
        public string Content_Type { get; private set; }
        public string State { get; private set; }
        public string Label { get; private set; }
        public Owner Owner { get; private set; }
        public string Html_Url { get; private set; }
        public string Url { get; private set; }
        public string Followers_Url { get; private set; }
        public string Following_Url { get; private set; }
        public string Gists_Url { get; private set; }
        public string Starred_Url { get; private set; }
        public string Subscriptions_Url { get; private set; }
        public string Organizations_Url { get; private set; }
        public string Repos_Url { get; private set; }
        public string Events_Url { get; private set; }
        public string Avatar_Url { get; private set; }
        public string Branches_Url { get; private set; }
        public string Browser_Download_Url { get; private set; }
        public string Received_Events_Url { get; private set; }
    }
}
