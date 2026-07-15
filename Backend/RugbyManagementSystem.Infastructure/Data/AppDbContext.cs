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


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Composite Primary Key for MatchPlayer
            modelBuilder.Entity<MatchPlayer>()
                .HasKey(mp => new { mp.PlayerId, mp.MatchId });

            modelBuilder.Entity<MatchDetails>()
                .HasKey(p => p.Id);


            // Player -> MatchPlayer
            modelBuilder.Entity<MatchPlayer>()
                .HasOne(mp => mp.Player)
                .WithMany(p => p.MatchPlayers)
                .HasForeignKey(mp => mp.PlayerId)
                .OnDelete(DeleteBehavior.Cascade);


            // Match -> MatchPlayer
            modelBuilder.Entity<MatchPlayer>()
                .HasOne(mp => mp.Match)
                .WithMany(m => m.MatchPlayers)
                .HasForeignKey(mp => mp.MatchId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
