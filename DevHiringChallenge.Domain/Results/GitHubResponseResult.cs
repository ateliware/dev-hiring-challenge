using System.Collections.Generic;

namespace DevHiringChallenge.Domain.Results
{
    public class GitHubResponseResult
    {
        public int Total_Count { get; set; }
        public bool Incomplete_Result { get; set; }
        public List<GitHubResult> Items { get; set; }
    }
}
