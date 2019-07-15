using System;
using System.Collections.Generic;
using DevHiringChallenge.Domain.Entities;
using prmToolkit.NotificationPattern;
using RestSharp.Extensions;

namespace DevHiringChallenge.Domain.Command.Inputs
{
    public class CriarGitHubCommand : Notifiable
    {
        public int Id { get; set; }
        public string Node_Id { get; set; }
        public string Name { get; set; }
        public string Full_Name { get; set; }
        public string Description { get; set; }
        public string Pushed_At { get; set; }
        public string Created_At { get; set; }
        public string Updated_At { get; set; }
        public Owner Owner { get; set; }
        public string Html_Url { get; set; }

        public void Validar()
        {
            var notificacao = new AddNotifications<CriarGitHubCommand>(this)
                .IfNull(x => x.Owner, "Owner não informado!")
                .IfNullOrEmpty(Html_Url, "Url não foi informado!")
                .IfNullOrEmpty(x => x.Name, "Nome do repositório não informado!")
                .IfNullOrEmpty(x => x.Description, "Descrição do repositório não informado!");
        }
    }
}