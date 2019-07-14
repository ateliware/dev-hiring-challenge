using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace AteliwareChallenge.Tests
{
    [TestClass]
    public class IndexUnitTest
    {
        [TestMethod]
        public void ConsultaCSharp()
        {
            string language = "csharp";
            int qtd = 1;
            string result = string.Empty;

            result = Index.ConsultarRepos(language, qtd);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ConsultaVB()
        {
            string language = "vb.net";
            int qtd = 1;
            string result = string.Empty;

            result = Index.ConsultarRepos(language, qtd);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ConsultaJava()
        {
            string language = "java";
            int qtd = 1;
            string result = string.Empty;

            result = Index.ConsultarRepos(language, qtd);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ConsultaJavaScript()
        {
            string language = "javascript";
            int qtd = 1;
            string result = string.Empty;

            result = Index.ConsultarRepos(language, qtd);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ConsultaPython()
        {
            string language = "python";
            int qtd = 1;
            string result = string.Empty;

            result = Index.ConsultarRepos(language, qtd);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void NenhumResultado()
        {
            string language = string.Empty;
            int qtd = 0;
            string result = string.Empty;

            result = Index.ConsultarRepos(language, qtd);

            Assert.IsNull(result);
        }
    }
}
