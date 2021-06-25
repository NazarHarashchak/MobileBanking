using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.DTOs
{
    public class ListTransactionsDTO : ResultDTO
    {
        public List<TransactionDTO> Transactions { get; set; }
    }
}
