using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevHiringChallenge.Domain.Entities
{
    public class ApiReply
    {
        public object Data { get; set; }
        public string Mensagem { get; set; } = "";
        public bool Sucesso { get; set; } = false;
        public int StatusCode { get; set; } = 500;

        public Method RetornarRestMethod(string method)
        {
            switch (method)
            {
                case "GET":
                    {
                        return Method.GET;
                    }

                case "POST":
                    {
                        return Method.POST;
                    }

                case "PUT":
                    {
                        return Method.PUT;
                    }

                case "DELETE":
                    {
                        return Method.DELETE;
                    }

                case "PATCH":
                    {
                        return Method.PATCH;
                    }
            }

            return Method.GET;
        }
    }
}