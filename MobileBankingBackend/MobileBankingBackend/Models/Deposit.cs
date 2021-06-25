using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.Models
{
    public class Deposit
    {
        public int ID { get; set; }
        public int ? CustomerID { get; set; }
        public Customer Customer { get; set; }
        public DateTime DateCreated { get; set; }
        public int Percent { get; set; }
        public double StartDeposit { get; set; }
        public int ? DepositTypeID { get; set; }
        public DepositType DepositType { get; set; }
        public DateTime LastUpdate { get; set; }
        public double CurrentSum { get; set; }
        public DateTime EndDate { get; set; }
    }
}
