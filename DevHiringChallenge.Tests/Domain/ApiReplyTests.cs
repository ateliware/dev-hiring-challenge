using System.Collections.Generic;
using System.Linq;
using DevHiringChallenge.Domain.Command.Inputs;
using DevHiringChallenge.Domain.Entities;
using DevHiringChallenge.Domain.Results;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RestSharp;

namespace DevHiringChallenge.Tests.Domain
{
    [TestClass]
    [TestCategory("Domain - ApiReplyTests")]
    public class ApiReplyTests
    {
        [TestMethod]
        public void Deve_retornar_falso_quando_apireply_preenchido()
        {
            var command = new ApiReply()
            {
               Data = "2019-07-16",
               Mensagem = "Sucesso",
               StatusCode = 200,
               Sucesso = true
            };

            command.Validar();

            Assert.IsFalse(command.Notifications.Any());
        }

        [TestMethod]
        public void Deve_retornar_verdadeiro_quando_apireply_nao_preenchido()
        {
            var command = new ApiReply();

            command.Validar();

            Assert.IsTrue(command.Notifications.Any());
        }

        [TestMethod]
        public void Deve_retornar_metodo_quando_apireply_preenchido_get()
        {
            var command = new ApiReply();

            var result = command.RetornarRestMethod("GET");

            Assert.AreEqual(Method.GET, result);
        }

        [TestMethod]
        public void Deve_retornar_metodo_quando_apireply_preenchido_post()
        {
            var command = new ApiReply();

            var result = command.RetornarRestMethod("POST");

            Assert.AreEqual(Method.POST, result);
        }

        [TestMethod]
        public void Deve_retornar_metodo_quando_apireply_preenchido_copy()
        {
            var command = new ApiReply();

            var result = command.RetornarRestMethod("COPY");

            Assert.AreEqual(Method.COPY, result);
        }

        [TestMethod]
        public void Deve_retornar_metodo_quando_apireply_preenchido_delete()
        {
            var command = new ApiReply();

            var result = command.RetornarRestMethod("DELETE");

            Assert.AreEqual(Method.DELETE, result);
        }

        [TestMethod]
        public void Deve_retornar_metodo_quando_apireply_preenchido_head()
        {
            var command = new ApiReply();

            var result = command.RetornarRestMethod("HEAD");

            Assert.AreEqual(Method.HEAD, result);
        }

        [TestMethod]
        public void Deve_retornar_metodo_quando_apireply_preenchido_merge()
        {
            var command = new ApiReply();

            var result = command.RetornarRestMethod("MERGE");

            Assert.AreEqual(Method.MERGE, result);
        }

        [TestMethod]
        public void Deve_retornar_metodo_quando_apireply_preenchido_options()
        {
            var command = new ApiReply();

            var result = command.RetornarRestMethod("OPTIONS");

            Assert.AreEqual(Method.OPTIONS, result);
        }

        [TestMethod]
        public void Deve_retornar_metodo_quando_apireply_preenchido_patch()
        {
            var command = new ApiReply();

            var result = command.RetornarRestMethod("PATCH");

            Assert.AreEqual(Method.PATCH, result);
        }

        [TestMethod]
        public void Deve_retornar_metodo_quando_apireply_preenchido_put()
        {
            var command = new ApiReply();

            var result = command.RetornarRestMethod("PUT");

            Assert.AreEqual(Method.PUT, result);
        }

        [TestMethod]
        public void Deve_retornar_metodo_quando_apireply_nao_preenchido()
        {
            var command = new ApiReply();

            var result = command.RetornarRestMethod("");

            Assert.AreEqual(Method.GET, result);
        }
    }
}
