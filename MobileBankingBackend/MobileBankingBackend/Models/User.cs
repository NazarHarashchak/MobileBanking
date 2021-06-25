using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.Models
{
    public class User
    {
        public int ID { get; set; }
        public string Login { get; set; }
        public byte[] Password { get; set; }
        public DateTime DateCreated { get; set; }
        public int ? UserApplicationRoleID { get; set; }
        public UserApplicationRole UserApplicationRole { get; set; }
        public UserInformation UserInformation { get; set; }
        public Customer Customer { get; set; }
        public bool IsActive { get; set; }
    }
}
