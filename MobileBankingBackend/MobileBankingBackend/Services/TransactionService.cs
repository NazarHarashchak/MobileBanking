using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileBankingBackend.Interfaces;
using MobileBankingBackend.DTOs;
using MobileBankingBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace MobileBankingBackend.Services
{
    public class TransactionService : ITransactionService
    {
        private DatabaseContext _context;
        public TransactionService(DatabaseContext context)
        {
            _context = context;
        }
        public ResultDTO AddTransaction(TransactionDTO transactionDTO)
        {
            var result = new ResultDTO();

            try
            {
                var transaction = new Transaction();

                var card = _context.Cards.Where(item => item.ID == transactionDTO.CardFromID).FirstOrDefault();

                if (card == null)
                {
                    result.Message = "Картки не існує";
                    result.Success = false;
                    return result;
                }

                transaction.CardFrom = card;
                transaction.Date = DateTime.Now;
                transaction.ModeyDraft = transactionDTO.Sum;
                transaction.MoneyOnBegin = card.Money;
                transaction.MoneyLeft = card.Money - transactionDTO.Sum;

                card.Money = card.Money - transactionDTO.Sum;

                transaction.TransactionType = _context.TransactionTypes.Where(item => item.ID == transactionDTO.TransactionTypeID).FirstOrDefault();
                transaction.AccountNumberTo = transactionDTO.CardNumberTo;

                var card2 = _context.Cards.Where(item => item.CardNumber == transactionDTO.CardNumberTo).FirstOrDefault();

                if (card2 != null)
                {
                    card2.Money = card2.Money + transactionDTO.Sum;

                    _context.Cards.Update(card2);
                }

                var credit = _context.Credits.Where(item => item.AccountNumber == transactionDTO.CardNumberTo).FirstOrDefault();

                if (credit != null)
                {
                    var history = new CreditHistory()
                    {
                        CreatedDate = DateTime.Now,
                        Credit = credit,
                        Deposit = transactionDTO.Sum,
                        ModifiedDate = DateTime.Now,
                        MoneyLeft = credit.MoneyLeft - transactionDTO.Sum,
                        MoneyLeftOnStart = credit.MoneyLeft
                    };

                    credit.MoneyLeft = credit.MoneyLeft - transactionDTO.Sum;

                    _context.CreditHistories.Add(history);
                    _context.Credits.Update(credit);
                }

                _context.Transactions.Add(transaction);
                _context.Cards.Update(card);
                _context.SaveChanges();

                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Success = false;
            }

            return result;
        }
        public ListTransactionsDTO GetTransactions(int cardID)
        {
            var result = new ListTransactionsDTO();

            try
            {
                var card = _context.Cards.Where(item => item.ID == cardID).FirstOrDefault();

                if (card == null)
                {
                    result.Success = false;
                    result.Message = "Картки не існує!";
                    return result;
                }

                var transactions = _context.Transactions.Where(item => item.CardFromID == cardID).Include(item => item.CardFrom).Include(item => item.TransactionType).ToList();

                result.Transactions = new List<TransactionDTO>();

                foreach (var transaction in transactions)
                {
                    result.Transactions.Add(new TransactionDTO()
                    {
                        ID = transaction.ID,
                        CardFromID = cardID,
                        CardFromNumber = transaction.CardFrom.CardNumber,
                        CardNumberTo = transaction.AccountNumberTo,
                        MoneyOnBegining = transaction.MoneyOnBegin,
                        Sum = transaction.ModeyDraft,
                        MoneyOnEnd = transaction.MoneyLeft,
                        TransactionType = transaction.TransactionType.Type,
                        TransactionTypeID = transaction.TransactionType.ID,
                        Date = $"{transaction.Date.ToShortDateString()} {transaction.Date.ToShortTimeString()}"
                    });
                }

                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Success = false;
            }

            return result;
        }

        public TransactionDTO FindTransaction(string id)
        {
            var result = new TransactionDTO();

            try
            {
                var transaction = _context.Transactions.Where(item => item.ID == Guid.Parse(id))
                    .Include(item => item.CardFrom).Include(item => item.TransactionType).FirstOrDefault();

                if (transaction == null)
                {
                    result.Success = false;
                    result.Message = "Такої транзакції не існує";
                    return result;
                }

                result = new TransactionDTO()
                {
                    ID = transaction.ID,
                    CardFromID = transaction.CardFrom.ID,
                    CardFromNumber = transaction.CardFrom.CardNumber,
                    CardNumberTo = transaction.AccountNumberTo,
                    MoneyOnBegining = transaction.MoneyOnBegin,
                    Sum = transaction.ModeyDraft,
                    MoneyOnEnd = transaction.MoneyLeft,
                    TransactionType = transaction.TransactionType.Type,
                    TransactionTypeID = transaction.TransactionType.ID,
                    Date = $"{transaction.Date.ToShortDateString()} {transaction.Date.ToShortTimeString()}"
                };

                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return result;
        }
    }
}
