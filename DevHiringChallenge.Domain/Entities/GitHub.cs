using System;

namespace DevHiringChallenge.Domain.Entities
{
    public class GitHub
    {
        public GitHub(int id, string nodeId, string name, string fullName, string description, string pushedAt, string createdAt, string updatedAt, Owner owner, string htmlUrl)
        {
            Codigo = new Guid();
            Id = id;
            Node_Id = nodeId;
            Name = name;
            Full_Name = fullName;
            Description = description;
            Pushed_At = pushedAt;
            Created_At = createdAt;
            Updated_At = updatedAt;
            Owner = owner;
            Html_Url = htmlUrl;
        }

        public Guid Codigo { get; private set; }
        public int Id { get; private set; }
        public string Node_Id { get; private set; }
        public string Name { get; private set; }
        public string Full_Name { get; private set; }
        public string Description { get; private set; }
        public string Pushed_At { get; private set; }
        public string Created_At { get; private set; }
        public string Updated_At { get; private set; }
        public Owner Owner { get; private set; }
        public string Html_Url { get; private set; }
    }
}