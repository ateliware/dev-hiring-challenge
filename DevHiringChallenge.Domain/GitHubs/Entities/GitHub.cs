namespace DevHiringChallenge.Domain.GitHubs.Entities
{
    public class GitHub
    {
        public int Id { get; set; }
        public string Node_Id { get; set; }
        public string Name { get; set; }
        public string Full_Name { get; set; }
        public Owner Owner { get; set; }
        public string Html_Url { get; set; }
        public string Description { get; set; }
        public bool Fork { get; set; }
        public string Url { get; set; }
        public string Branches_Url { get; set; }
        public string Pushed_At { get; set; }
        public string Created_At { get; set; }
        public string Updated_At { get; set; }
        public int Size { get; set; }
        public string Content_Type { get; set; }
        public string State { get; set; }
        public string Label { get; set; }
        public string Browser_Download_Url { get; set; }
    }
}