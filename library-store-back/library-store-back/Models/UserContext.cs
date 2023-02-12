using Microsoft.EntityFrameworkCore;

namespace library_store_back.Models
{
    public class UserContext : DbContext // or AppDataContext
    {
        public UserContext(DbContextOptions<UserContext> options) 
            : base(options) 
              { 
        
              }

        public DbSet<User> Users { get; set; }
    }
}
