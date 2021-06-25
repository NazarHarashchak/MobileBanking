using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.Models
{
    public class Credit
    {
        public int ID { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastPaymentDate { get; set; }
        public DateTime DateEnd { get; set; }
        public string AccountNumber { get; set; }
        public int ? CustomerID { get; set; }
        public Customer Customer { get; set; }
        public int MonthCount  { get; set; }
        public double MoneyLeft { get; set; }
        public double MinDraft { get; set; }
        public bool IsActive { get; set; }
        public int CreditTypeID { get; set; }
        public CreditType CreditType { get; set; }
        public List<CreditHistory> CreditHistories { get; set; }
    }
}
