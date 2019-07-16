using System.Collections.Generic;
using prmToolkit.NotificationPattern;

namespace DevHiringChallenge.Domain.Results
{
    public class GitHubResponseResult : Notifiable
    {
        public int Total_Count { get; set; }
        public bool Incomplete_Result { get; set; }
        public IEnumerable<GitHubResult> Items { get; set; }

        public void Validar()
        {
            new AddNotifications<GitHubResponseResult>(this)
                .IfEqualsZero(x => x.Total_Count)
                .IfCollectionIsNull(x=>x.Items)
                .IfTrue(x => x.Incomplete_Result);
        }
    }
}
