using System;
using prmToolkit.NotificationPattern;

namespace DevHiringChallenge.Domain.Results
{
    public class OwnerResult : Notifiable
    {
        public string Login { get; set; }
        public int Id { get; set; }
        public string Node_Id { get; set; }
        public string Avatar_Url { get; set; }
        public string Type { get; set; }
        public string Url { get; set; }

        public void Validar()
        {
            new AddNotifications<OwnerResult>(this)
                .IfNullOrEmpty(x => x.Node_Id)
                .IfNullOrEmpty(x => x.Login)
                .IfNullOrEmpty(x => x.Avatar_Url)
                .IfNullOrEmpty(x => x.Type)
                .IfNullOrEmpty(x => x.Url)
                .IfEqualsZero(x => x.Id);
        }
    }
}
