using Lotto3000.Domain.Entities;
using Lotto3000.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lotto3000.DataAccess
{
    public class Lotto3000DbContext : DbContext
    {
        public DbSet<UserDto> Users { get; set; }
        public DbSet<LottoTicketDto> LottoTickets { get; set; }
        public DbSet<LottoSessionDto> LottoSessions { get; set; }

        public Lotto3000DbContext(DbContextOptions<Lotto3000DbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.Entity<UserDto>().HasData(
               new UserDto
               {
                   Id = 1,
                   FirstName = "John",
                   LastName = "Doe",
                   UserName = "adminJohn",
                   Email = "john@admin.com",
                   Password = PasswordHasher.HashPassword("asd123"),
                   IsAdmin = true
               },
               new UserDto
               {
                   Id = 2,
                   FirstName = "Bob",
                   LastName = "Bobsky",
                   UserName = "adminBob",
                   Email = "bob@admin.com",
                   Password = PasswordHasher.HashPassword("password123"),
                   IsAdmin = true
               }
           );
            builder.Entity<UserDto>(x => x.ToTable("User"));
            builder.Entity<LottoTicketDto>(x => x.ToTable("LottoTicket"));
            builder.Entity<LottoSessionDto>(x => x.ToTable("LottoSession"));
        }
    }
}
