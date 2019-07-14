using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace AteliwareChallenge.Business
{
    public static class Utilities
    {
        #region Métodos Públicos

        /// <summary>
        /// Função para request do tipo 'GET'.
        /// </summary>
        /// <param name="url">URL para request.</param>
        /// <returns>Response da API.</returns>
        public static HttpResponseMessage RequestGET(string url)
        {
            try
            {
                HttpResponseMessage _Response = GerarHttpClientAPI().GetAsync(url).Result;
                if (!_Response.IsSuccessStatusCode)
                    throw new Exception("O último request do tipo 'GET' feito à API não obteve sucesso.");

                return _Response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " - Função : RequestGET().", ex);
            }
        }

        /// <summary>
        /// Função para retorno do conteúdo da resposta.
        /// </summary>
        /// <param name="response">O response da API.</param>
        /// <returns>Content em forma de JObject.</returns>
        public static string RetornarContentResponse(HttpResponseMessage response)
        {
            try
            {
                return response.Content.ReadAsStringAsync().Result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " - Função : RetornarContentResponse().", ex);
            }
        }

        #endregion

        #region Métodos Privados

        /// <summary>
        /// Monta o header do request.
        /// </summary>
        /// <returns>O header do request.</returns>
        private static HttpClient GerarHttpClientAPI()
        {
            HttpClient _Client = new HttpClient();
            {
                var withBlock = _Client;
                withBlock.BaseAddress = new Uri(ConfigurationManager.AppSettings["PathAPI"]);
                withBlock.DefaultRequestHeaders.Accept.Clear();
                withBlock.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                withBlock.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue(new ProductHeaderValue("DracoFC")));
                withBlock.Timeout = new TimeSpan(0, 5, 0);
            }

            return _Client;
        }

        #endregion
    }
}