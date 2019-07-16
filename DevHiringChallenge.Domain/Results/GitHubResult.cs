using prmToolkit.NotificationPattern;

namespace DevHiringChallenge.Domain.Results
{
    public class GitHubResult : Notifiable
    {
        public int Id { get; set; }
        public string Node_Id { get; set; }
        public string Name { get; set; }
        public string Full_Name { get; set; }
        public string Description { get; set; }
        public string Pushed_At { get; set; }
        public string Created_At { get; set; }
        public string Updated_At { get; set; }
        public OwnerResult Owner { get; set; }
        public string Html_Url { get; set; }
        public string Language { get; set; }

        public void Validar()
        {
            new AddNotifications<GitHubResult>(this)
                .IfNullOrEmpty(x => x.Node_Id)
                .IfNullOrEmpty(x => x.Pushed_At)
                .IfNullOrEmpty(x => x.Created_At)
                .IfNullOrEmpty(x => x.Updated_At)
                .IfNullOrEmpty(x => x.Html_Url)
                .IfNullOrEmpty(x => x.Language)
                .IfNullOrEmpty(x => x.Description)
                .IfNullOrEmpty(x => x.Name)
                .IfNullOrEmpty(x => x.Full_Name)
                .IfNull(x=>x.Owner)
                .IfEqualsZero(x => x.Id);
        }
    }
}