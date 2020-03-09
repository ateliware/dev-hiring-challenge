using Swashbuckle.Application;
using Swashbuckle.Swagger;
using System.Collections.Generic;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Description;

namespace DevHiringChallenge.Api
{
    public class SwaggerConfig
    {
        public static void Registrar(HttpConfiguration config)
        {
            Assembly assembly = typeof(SwaggerConfig).Assembly;

            config.EnableSwagger(c =>
            {
                c.BasicAuth("basic").Description("Bearer Token Authentication");
                c.OperationFilter<AddRequiredHeaderParameter>();

                c.SingleApiVersion("v1", "DevHiringChallenge");
            })
                .EnableSwaggerUi(c =>
                {

                });
        }

        public class AddRequiredHeaderParameter : IOperationFilter
        {

            public void Apply(Operation operation, SchemaRegistry schemaRegistry, ApiDescription apiDescription)
            {
                if (operation.parameters == null)
                {
                    operation.parameters = new List<Parameter>();
                }

                operation.parameters.Add(new Parameter
                {
                    name = "Authorization",
                    @in = "header",
                    type = "string",
                    //required = true
                });
            }
        }
    }
}
