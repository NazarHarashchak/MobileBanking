using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.Models
{
    public class Transaction
    {
        public Guid ID { get; set; }
        public DateTime Date { get; set; }
        public int ? TransactionTypeID { get; set; }
        public TransactionType TransactionType { get; set; }
        public int ? CardFromID { get; set; }
        [ForeignKey("CardFromID")]
        public Card CardFrom { get; set; }
        public string AccountNumberTo { get; set; }
        public double MoneyOnBegin { get; set; }
        public double ModeyDraft { get; set; }
        public double MoneyLeft { get; set; }
    }
}
