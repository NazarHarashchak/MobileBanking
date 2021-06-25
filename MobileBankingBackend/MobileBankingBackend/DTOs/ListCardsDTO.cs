using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.DTOs
{
    public class ListCardsDTO : ResultDTO
    {
        public List<CardDTO> Cards { get; set; }
    }
}
