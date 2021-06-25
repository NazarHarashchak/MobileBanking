using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.Models
{
    public class Contact
    {
        public int ID { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
