using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.Models
{
    public class CreditType
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public double YearPercent { get; set; }
        public double MaxCash { get; set; }
        public bool IsActive { get; set; }
    }
}
