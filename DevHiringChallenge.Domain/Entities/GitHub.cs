using DevHiringChallenge.Domain.ValueObjects;
using System;
using prmToolkit.NotificationPattern;

namespace DevHiringChallenge.Domain.Entities
{
    public class GitHub : Notifiable
    {
        public GitHub()
        {
            new AddNotifications<GitHub>(this)
                .IfNullOrEmpty(x => x.Html_Url.Html_Url, "Não foi possível buscar a url!");
        }

        public Guid Codigo { get; set; }
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
        public Owner Owner { get; set; }
        public Link Html_Url { get; set; }
        public Link Url { get; set; }
        public Link Branches_Url { get; set; }
        public Link Browser_Download_Url { get; set; }
    }
}
