namespace GitHubWebApi.Domain.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("GitHub")]
    public partial class GitHub
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public long IdGitHub { get; set; }

        [Required]
        [StringLength(150)]
        public string RepositoryName { get; set; }

        [Required]
        [StringLength(50)]
        public string Language { get; set; }

        [Required]
        [StringLength(150)]
        public string Owner { get; set; }

        [Required]
        [StringLength(250)]
        public string GitUrl { get; set; }

        [Required]        
        public int Stars { get; set; }

        [Required]        
        public DateTime CreationDate { get; set; }
    }
}
