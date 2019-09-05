using ateliware_ws.Models;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace ateliware_ws.Dados
{

    public class RepositorioContext : DbContext
    {
        
        public RepositorioContext() {
            this.Database.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString;    
            Configuration.ProxyCreationEnabled = false;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            modelBuilder.Entity<Repositorio>().ToTable("TB_REPOSITORIO");

            modelBuilder.Entity<Linguagem>().ToTable("TB_REPOSITORIO_LINGUAGEM");
            
            modelBuilder.Entity<Repositorio>().HasKey(r => r.ID_NODE);

            modelBuilder.Entity<Linguagem>().HasKey(l => l.ID_LINGUAGEM);

            base.OnModelCreating(modelBuilder);
        }


        public DbSet<Repositorio> Repositorios { get; set; }

        public DbSet<Linguagem> Linguagens { get; set; }

    }

    


}