using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.DTOs
{
    public class CardDTO :ResultDTO
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public int CardTypeID { get; set; }
        public string CardNumber { get; set; }
        public int EndMonth { get; set; }
        public int EndYear { get; set; }
        public int CVV { get; set; }
        public bool IsActive { get; set; }
        public string DateCreated { get; set; }
        public double Money { get; set; }
        public string UserFullName { get; set; }

    }
}
