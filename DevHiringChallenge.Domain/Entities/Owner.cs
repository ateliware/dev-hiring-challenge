using System;

namespace DevHiringChallenge.Domain.Entities
{
    public class Owner
    {
        public Owner(string login, int id, string nodeId, string avatarUrl, string gravatarId, string type, string url)
        {
            Codigo = new Guid();
            Login = login;
            Id = id;
            Node_Id = nodeId;
            Avatar_Url = avatarUrl;
            Gravatar_Id = gravatarId;
            Type = type;
            Url = url;
        }

        public Guid Codigo { get; set; }
        public string Login { get; set; }
        public int Id { get; set; }
        public string Node_Id { get; set; }
        public string Avatar_Url { get; set; }
        public string Gravatar_Id { get; set; }
        public string Type { get; set; }
        public string Url { get; set; }
    }
}
