using DevHiringChallenge.AppService.Interface.Base;
using DevHiringChallenge.Infra.UoW;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using DevHiringChallenge.Domain.Interfaces;

#pragma warning disable 1998

namespace DevHiringChallenge.Api.Controllers.Base
{
    public class ControllerBase : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private IServiceBase _serviceBase;

        public ControllerBase(IUnitOfWork uow) => _unitOfWork = uow;

        protected ControllerBase()
        {
        }

        public async Task<HttpResponseMessage> ResponseAsync(object result)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.Conflict, $"Houve um problema interno com o servidor. Erro interno: {ex.Message}");
            }
        }

        public async Task<HttpResponseMessage> ResponseAsync(object result, IServiceBase serviceBase)
        {
            _serviceBase = serviceBase;

            if (serviceBase.Notifications.Any())
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { errors = serviceBase.Notifications });

            try
            {
                _unitOfWork.Commit();

                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.Conflict, $"Houve um problema interno com o servidor. Erro interno: {ex.Message}");
            }
        }

        public async Task<HttpResponseMessage> ResponseExceptionAsync(Exception ex)
        {
            return Request.CreateResponse(HttpStatusCode.InternalServerError, new { errors = ex.Message, exception = ex.ToString() });
        }

        protected override void Dispose(bool disposing)
        {
            _serviceBase?.Dispose();

            base.Dispose(disposing);
        }
    }
}