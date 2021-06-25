using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.Models
{
    public class UserInformation
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public int Age { get; set; }
        public string PhoneNumber { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string StreetName { get; set; }
        public string HouseNumber { get; set; }
        public bool IsPrivateHouse { get; set; }
        public int ? AppartmentsNumber { get; set; }
        public int ? UserID { get; set; }
        public User User { get; set; }
        public string Image { get; set; }
    }
}
