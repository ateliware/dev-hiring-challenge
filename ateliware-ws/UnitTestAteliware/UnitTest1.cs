using ateliware_ws.Models;
using ateliware_ws.Controllers;
using ateliware_ws.DAO;
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;

namespace UnitTestAteliware
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethodListarNotNull()
        {

            RepositoryEntityDAO RepositoryDAO = new RepositoryEntityDAO();
            List<Repositorio> Repositorio = new List<Repositorio>();
            Repositorio = RepositoryDAO.Listar();

            Assert.IsNotNull(Repositorio);
        }

        [TestMethod]
        public void TestMethodGravarNotInstanciate()
        {

            RepositoryEntityDAO RepositoryDAO = new RepositoryEntityDAO();
            List<Repositorio> Repositorio = new List<Repositorio>();
            Repositorio = null;

            Assert.AreEqual(RepositoryDAO.Adicionar(Repositorio), false);
        }

        [TestMethod]
        public void TestMethodGravarInstanciate()
        {

            RepositoryEntityDAO RepositoryDAO = new RepositoryEntityDAO();

            Repositorio Repositorio1 = new Repositorio();
            Repositorio Repositorio2 = new Repositorio();
            Linguagem Linguagem1 = new Linguagem();
            Linguagem Linguagem2 = new Linguagem();
            List<Repositorio> Repositorio = new List<Repositorio>();

            Linguagem1.ID_NODE = "1236544";
            Linguagem1.NOME_LINGUAGEM = "NODEJS";

            Repositorio1.ID_NODE = "MFLSKFNSDFLSFKNSDF1";
            Repositorio1.Linguagem.Add(Linguagem1);
            Repositorio1.NOME_COMPLETO_REPOSITORIO = "REPOSITORIO 1";
            Repositorio1.URL_LINGUAGEM = "http:\\";

            Repositorio.Add(Repositorio1);

            Assert.AreEqual(RepositoryDAO.Adicionar(Repositorio), true);
        }

        [TestMethod]
        public void TestMethodClasseNotNull()
        {

            Repositorio Repositorio = new Repositorio();
            Repositorio.ID = 5;
            Repositorio.NOME_REPOSITORIO = "TESTE";
            Repositorio.URL_LINGUAGEM = "link:http//";

            Assert.IsNotNull(Repositorio);
        }

        [TestMethod]
        public void TestMethodClasseNullInstance()
        {
            Repositorio Repositorio = new Repositorio();
            Repositorio = null;

            Assert.IsNull(Repositorio);

        }
    }
}
