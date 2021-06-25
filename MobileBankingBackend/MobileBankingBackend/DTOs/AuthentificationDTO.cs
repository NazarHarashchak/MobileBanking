using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.DTOs
{
    public class AuthentificationDTO : ResultDTO
    {
        public int ID { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public int RoleID { get; set; }
    }
}
