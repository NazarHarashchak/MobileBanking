using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.DTOs
{
    public class UserDTO : ResultDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public bool IsPrivateHouse { get; set; }
        public int AppartmentsNumber { get; set; }
        public bool IsActive { get; set; }
        public int RoleID { get; set; }
        public int Age { get; set; }
        public string Image { get; set; }
    }
}
