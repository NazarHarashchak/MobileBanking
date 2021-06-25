using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.DTOs
{
    public class TransactionDTO : ResultDTO
    {
        public Guid ID { get; set; }
        public int TransactionTypeID { get; set; }
        public string TransactionType { get; set; }
        public int CardFromID { get; set; }
        public string CardFromNumber { get; set; }
        public double Sum { get; set; }
        public string CardNumberTo { get; set; }
        public double MoneyOnBegining { get; set; }
        public double MoneyOnEnd { get; set; }
        public string Date { get; set; }
    }
}
