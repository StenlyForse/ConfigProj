using ASUTP.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ASUTP.API.Data
{
    public class ASUTPDbContext : DbContext
    {
        public ASUTPDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<CatalogElem> Catalog { get; set; }

        public DbSet<UsersElem> Users { get; set; }

        public DbSet<ConfigsElem> Configs { get; set; }
    }
}
