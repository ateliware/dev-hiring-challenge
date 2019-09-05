
using ateliware_ws.Dados;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ateliware_ws.Models
{
    public class Repositorio
    {
        [JsonProperty("id")]
        public int ID { get; set; }

        [JsonProperty("node_id")]
        public string ID_NODE { get; set; }

        [JsonProperty("name")]
        public string NOME_REPOSITORIO { get; set; }

        [JsonProperty("full_name")]
        public string NOME_COMPLETO_REPOSITORIO { get; set; }

        [JsonProperty("description")]
        public string DESCRICAO_REPOSITORIO { get; set; }

        [JsonProperty("html_url")] 
        public string LINK_PUBLICO { get; set; }

        [NotMapped]
        [JsonProperty("owner")]
        public Autor Autor { get; set; }

        [JsonProperty("login")]
        public string LOGIN { get; set; }

        [JsonProperty("link_foto")]
        public string LINK_FOTO { get; set; }

        [JsonProperty("languages_url")]
        public string URL_LINGUAGEM { get; set; }

        //[JsonIgnore]
        public List<Linguagem> Linguagem { get; set; }
    }

    public class Autor
    {
        [JsonProperty("login")]
        public string LOGIN { get; set; }

        [JsonProperty("avatar_url")]
        public string LINK_FOTO { get; set; }
    }

    public class Linguagem
    {
        public string ID_NODE { get; set; }

        [JsonProperty("id_linguagem")]
        public int ID_LINGUAGEM { get; set; }

        [JsonProperty("nome_liguagem")]
        public string NOME_LINGUAGEM { get; set; }
    }
}