using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileBankingBackend.Models;

namespace MobileBankingBackend.DTOs
{
    public class CardTypeDTO : ResultDTO
    {
        public List<CardType> CardTypes { get; set; }
    }
}
