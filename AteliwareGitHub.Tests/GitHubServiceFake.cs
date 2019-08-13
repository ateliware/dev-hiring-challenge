using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using AteliwareGitHub.Server.Core.Interface;
using AteliwareGitHub.Shared;

namespace AteliwareGitHub.Tests
{
    public class GitHubServiceFake : IGitHubService
    {
        private List<LanguagesDTO> llangs;

        public GitHubServiceFake()
        {
            llangs = new List<LanguagesDTO>()
            {
                new LanguagesDTO(){ name = "COBOL", qtd = 233 },
                new LanguagesDTO(){ name = "DELPHI", qtd = 222 },
                new LanguagesDTO(){ name = "OBJECT PASCAL", qtd = 8 },
                new LanguagesDTO(){ name = "C ANSI", qtd = 24 },
                new LanguagesDTO(){ name = "GWBASIC", qtd = 22 },
                new LanguagesDTO(){ name = "MIMBUS", qtd = 2222 },
                new LanguagesDTO(){ name = "CORPORAL", qtd = 222 },
                new LanguagesDTO(){ name = "LIBRAS", qtd = 234 }
            };
        }

        public IHttpClientFactory httpclientFactory { get; set; }

        public async Task<IEnumerable<LanguagesDTO>> Languages()
        {
            return llangs;
        }
    }
}
