using Microsoft.EntityFrameworkCore;
using MobileBankingBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Card> Cards { get; set; }
        public DbSet<CardType> CardTypes { get; set; }
        public DbSet<Credit> Credits { get; set; }
        public DbSet<CreditType> CreditTypes { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Deposit> Deposits { get; set; }
        public DbSet<DepositType> DepositTypes { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<TransactionType> TransactionTypes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserApplicationRole> UserApplicationRoles { get; set; }
        public DbSet<UserInformation> UserInformations { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<CreditHistory> CreditHistories { get; set; }
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Card>()
                .HasMany(p => p.Transactions)
                .WithOne(t => t.CardFrom)
                .HasForeignKey(p => p.CardFromID);
        }
    }
}
