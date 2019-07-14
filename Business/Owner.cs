using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AteliwareChallenge.Business
{
    public class Owner
    {
        #region Propriedades / Variáveis

        [JsonIgnore] public JObject original;

        public int id;
        public string login;
        public Uri avatar_url;
        public Uri html_url;
        public string type;

        #endregion

        #region Construtores

        private Owner() { }

        public Owner(JObject proprietario)
        {
            this.original = proprietario;
            this.id = (int)original["id"];
            this.login = (string)original["login"];
            this.avatar_url = new Uri((string)original["avatar_url"]);
            this.html_url = new Uri((string)original["html_url"]);
            this.type = (string)original["type"];
        }

        #endregion
    }
}