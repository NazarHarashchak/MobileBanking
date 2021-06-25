using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileBankingBackend.DTOs;

namespace MobileBankingBackend.Interfaces
{
    public interface ITransactionService
    {
        public ResultDTO AddTransaction(TransactionDTO transaction);
        public ListTransactionsDTO GetTransactions(int cardID);
        public TransactionDTO FindTransaction(string id);
    }
}
