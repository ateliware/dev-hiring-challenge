using System.Collections.Generic;

namespace githubproj.Models
{
    public class RepoViewModel
    {
        public IList<RepoItemDetails> items { get; set; }

        public int total_count { get; set; }
        public bool incomplete_results { get; set; }
        public RepoViewModel()
        {
            this.items = new List<RepoItemDetails>();
        }
    }
    public class RepoItemDetails : BaseModel
    {
    }

    public class DetailsViewModel : BaseModel
    {
    }
}
