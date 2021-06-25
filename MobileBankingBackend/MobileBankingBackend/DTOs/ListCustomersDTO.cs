using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.DTOs
{
    public class ListCustomersDTO : ResultDTO
    {
        public List<CustomerDTO> Customers { get; set; }
    }
}
