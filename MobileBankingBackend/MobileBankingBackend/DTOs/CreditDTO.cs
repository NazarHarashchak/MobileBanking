using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.DTOs
{
    public class CreditDTO
    {
        public int ID { get; set; }
        public string DateCreated { get; set; }
        public string LastPaymentDate { get; set; }
        public string DateEnd { get; set; }
        public string AccountNumber { get; set; }
        public int UserID { get; set; }
        public string UserName { get; set; }
        public int MonthCount { get; set; }
        public double MoneyLeft { get; set; }
        public double MinDraft { get; set; }
        public bool IsActive { get; set; }
        public int CreditTypeID { get; set; }
        public string CreditType { get; set; }
        public string CardNumber { get; set; }
        public double CreditSum { get; set; }
    }
}
