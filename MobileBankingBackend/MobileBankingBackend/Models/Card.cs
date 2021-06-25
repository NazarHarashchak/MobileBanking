using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.Models
{
    public class Card
    {
        public int ID { get; set; }
        public string CardNumber { get; set; }
        public int EndMonth { get; set; }
        public int EndYear { get; set; }
        public int CVV { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsActive { get; set; }
        public int ? CustomerID { get; set; }
        public Customer Customer { get; set; }
        public int ? CardTypeID { get; set; }
        public CardType CardType { get; set; }
        public double Money { get; set; }
        public List<Transaction> Transactions { get; set; }
        public Card()
        {
            Transactions = new List<Transaction>();
        }
    }
}
