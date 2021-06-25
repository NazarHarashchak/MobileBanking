using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.DTOs
{
    public class ListUsersDTO : ResultDTO
    {
        public List<UserDTO> Users { get; set; }
    }
}
