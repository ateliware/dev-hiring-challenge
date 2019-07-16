using System;
using prmToolkit.NotificationPattern;

namespace DevHiringChallenge.Domain.Entities
{
    public class Owner : Notifiable
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

        public void Validar()
        {
            new AddNotifications<Owner>(this)
                .IfNullOrEmpty(x => x.Node_Id)
                .IfNullOrEmpty(x => x.Login)
                .IfNullOrEmpty(x => x.Avatar_Url)
                .IfNullOrEmpty(x => x.Type)
                .IfNullOrEmpty(x => x.Url)
                .IfEqualsZero(x => x.Id);
        }
    }
}
