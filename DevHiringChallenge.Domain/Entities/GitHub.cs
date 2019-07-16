using System;
using prmToolkit.NotificationPattern;

namespace DevHiringChallenge.Domain.Entities
{
    public class GitHub : Notifiable
    {
        public GitHub(int id, string nodeId, string name, string fullName, string description, string pushedAt, string createdAt, string updatedAt, Owner owner, string htmlUrl, string language)
        {
            CodigoGitHub = Guid.NewGuid();
            Id = id;
            Node_Id = nodeId;
            Name = name;
            Full_Name = fullName;
            Description = description;
            Pushed_At = pushedAt;
            Created_At = createdAt;
            Updated_At = updatedAt;
            Owner = owner;
            Html_Url = htmlUrl;
            Language = language;
        }

        public Guid CodigoGitHub { get; private set; }
        public int Id { get; private set; }
        public string Node_Id { get; private set; }
        public string Name { get; private set; }
        public string Full_Name { get; private set; }
        public string Description { get; private set; }
        public string Pushed_At { get; private set; }
        public string Created_At { get; private set; }
        public string Updated_At { get; private set; }
        public Owner Owner { get; private set; }
        public string Html_Url { get; private set; }
        public string Language { get; private set; }

        public void Validar()
        {
            new AddNotifications<GitHub>(this)
                .IfNullOrEmpty(x => x.Node_Id)
                .IfNullOrEmpty(x => x.Pushed_At)
                .IfNullOrEmpty(x => x.Created_At)
                .IfNullOrEmpty(x => x.Updated_At)
                .IfNullOrEmpty(x => x.Html_Url)
                .IfNullOrEmpty(x => x.Language)
                .IfNullOrEmpty(x => x.Description)
                .IfNullOrEmpty(x => x.Name)
                .IfNullOrEmpty(x => x.Full_Name)
                .IfNull(x => x.Owner)
                .IfEqualsZero(x => x.Id);
        }
    }
}