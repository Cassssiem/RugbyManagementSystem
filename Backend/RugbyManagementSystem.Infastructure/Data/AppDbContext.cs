using Microsoft.EntityFrameworkCore;
using RugbyManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<PlayerDetails> Players { get; set; }
        public DbSet<MatchDetails> Matches { get; set; }
        public DbSet<UserDetails> Users { get; set; }


    }
}
