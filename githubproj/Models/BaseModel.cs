namespace githubproj.Models
{
    public class BaseModel
    {
        public int id { get; set; }
        public string name { get; set; }
        public string full_name { get; set; }
        public Owner owner { get; set; }
        public string description { get; set; }
        public string created_at { get; set; }
        public string git_url { get; set; }
        public string url { get; set; }

        public class Owner
        {
            public int id { get; set; }
            public string login { get; set; }
            public string avatar_url { get; set; }

        }
    }
}
