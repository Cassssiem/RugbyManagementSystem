using Microsoft.EntityFrameworkCore;
using RugbyManagementSystem.Application.DTOs.CreatePlayerDTOs;
using RugbyManagementSystem.Application.DTOs.UpdatePlayer;
using RugbyManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Infastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<PlayerDetails> Players { get; set; }
        public DbSet<MatchDetails> Matches { get; set; }
        public DbSet<UserDetails> Users { get; set; }
        public DbSet<MatchPlayer> MatchPlayers { get; set; }
        public DbSet<CreatePlayerDTOs> CreatePlayerDTOs { get; set; }
        public DbSet<UpdatePlayerDTOs> UpdatePlayers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            // MatchPlayer Composite Primary Key
            modelBuilder.Entity<MatchPlayer>()
                .HasKey(mp => new { mp.PlayerId, mp.MatchId });


            // Player -> MatchPlayer relationship
            modelBuilder.Entity<MatchPlayer>()
                .HasOne(mp => mp.Player);




            // Match -> MatchPlayer relationship
            modelBuilder.Entity<MatchPlayer>()
                .HasOne(mp => mp.Match);

  
   


            // Player configuration
            modelBuilder.Entity<PlayerDetails>()
                .HasKey(p => p.Id);


            // Match configuration
            modelBuilder.Entity<MatchDetails>()
                .HasKey(m => m.Id);
        }
    }
}
