using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using AteliwareGitHub.Shared;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace AteliwareGitHub.Server.Core.Interface
{
    
    public interface IGitHubService
    {
        IHttpClientFactory httpclientFactory { get; set; }

        Task<IEnumerable<LanguagesDTO>> Languages();
    }
}
