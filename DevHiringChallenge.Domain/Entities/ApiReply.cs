using prmToolkit.NotificationPattern;
using RestSharp;

namespace DevHiringChallenge.Domain.Entities
{
    public class ApiReply : Notifiable
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

                case "MERGE":
                    {
                        return Method.MERGE;
                    }

                case "HEAD":
                    {
                        return Method.HEAD;
                    }

                case "COPY":
                    {
                        return Method.COPY;
                    }

                case "OPTIONS":
                    {
                        return Method.OPTIONS;
                    }
            }

            return Method.GET;
        }

        public void Validar()
        {
            new AddNotifications<ApiReply>(this)
                .IfNull(x => x.Data)
                .IfNullOrEmpty(x => x.Mensagem)
                .IfEqualsZero(x => x.StatusCode)
                .IfFalse(x => x.Sucesso);
        }
    }
}