using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.DTOs
{
    public class ListCreditDTO : ResultDTO
    {
        public List<CreditDTO> Credits { get; set; }
    }
}
