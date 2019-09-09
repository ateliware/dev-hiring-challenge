namespace Domain.Entities
{
    public class UserRepository
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int RepositoryId { get; set; }
        public Repository Repository { get; set; }
    }
}