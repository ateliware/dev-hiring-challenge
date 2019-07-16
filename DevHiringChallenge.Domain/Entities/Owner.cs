using System;

namespace DevHiringChallenge.Domain.Entities
{
    public class Owner
    {
        public Owner(string login, int id, string nodeId, string avatarUrl, string type, string url)
        {
            Login = login;
            Id = id;
            Node_Id = nodeId;
            Avatar_Url = avatarUrl;
            Type = type;
            Url = url;
        }

        public Guid CodigoOwner { get; set; }
        public string Login { get; set; }
        public int Id { get; set; }
        public string Node_Id { get; set; }
        public string Avatar_Url { get; set; }
        public string Type { get; set; }
        public string Url { get; set; }
    }
}
