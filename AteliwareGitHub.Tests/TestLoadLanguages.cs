using System;
using System.Collections.Generic;
using AteliwareGitHub.Server.Controllers;
using AteliwareGitHub.Server.Core.Interface;
using AteliwareGitHub.Shared;
using Xunit;

namespace AteliwareGitHub.Tests
{
    public class TestLoadLanguages
    {
        GitHubController _controller;
        IGitHubService _service;

        public TestLoadLanguages()
        {
            _service = new GitHubServiceFake();
            _controller = new GitHubController(null,_service);
        }

        [Fact]
        public void Languages()
        {
            var resultAttempt = _controller.Languages();

            Assert.IsType<IEnumerable<LanguagesDTO>>(resultAttempt);
        }
    }
}
