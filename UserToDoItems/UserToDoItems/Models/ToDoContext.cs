using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserToDoItems.Models
{
    public class ToDoContext:DbContext
    {
        public ToDoContext(DbContextOptions<ToDoContext> options):base(options)
        {

        }
        public DbSet<ToDoItem> ToDoItems { get; set; }
        public DbSet<ToDoUsers> ToDoUsers { get; set; }
        public DbSet<Login> UserLogin { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ToDoUsers>(user => user.HasKey(u => u.ID));
            modelBuilder.Entity<ToDoItem>(item => item.HasOne(user => user.User).WithMany(items => items.ToDoItems).HasForeignKey(uitem => uitem.UserID));
            modelBuilder.Entity<Login>().HasOne<ToDoUsers>(s => s.User).WithOne(ad => ad.Login).HasForeignKey<Login>(ad => ad.UserID);
        }
    }
}
