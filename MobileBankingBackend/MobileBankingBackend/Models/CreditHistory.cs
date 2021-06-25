using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.Models
{
    public class CreditHistory
    {
        public int ID { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public double MoneyLeftOnStart { get; set; }
        public double MoneyLeft { get; set; }
        public double Deposit { get; set; }
        public int ? CreditID { get; set; }
        public Credit Credit { get; set; }
    }
}
