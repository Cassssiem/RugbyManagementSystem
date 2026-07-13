using Microsoft.EntityFrameworkCore;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Player table configuration
            modelBuilder.Entity<PlayerDetails>()
                .HasKey(p => p.Id);

            // Match table configuration
            modelBuilder.Entity<MatchDetails>()
                .HasKey(m => m.Id);

            // MatchPlayer composite key
            modelBuilder.Entity<MatchPlayer>()
                .HasKey(mp => new { mp.PlayerId, mp.MatchId });


            // MatchPlayer -> PlayerDetails
            modelBuilder.Entity<MatchPlayer>()
                .HasOne(mp => mp.Player)
                .WithMany(p => p.MatchPlayers)
                .HasForeignKey(mp => mp.PlayerId);


            // MatchPlayer -> MatchDetails
            modelBuilder.Entity<MatchPlayer>()
                .HasOne(mp => mp.Match)
                .WithMany(m => m.MatchPlayers)
                .HasForeignKey(mp => mp.MatchId);

        }
    }
}
