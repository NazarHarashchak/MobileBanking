using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.Models
{
    public class DepositType
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int YearPercent { get; set; }
        public double MinMoney { get; set; }
        public int MaxMonthCount { get; set; }
        public bool IsActive { get; set; }
    }
}
