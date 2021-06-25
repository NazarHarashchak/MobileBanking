using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileBankingBackend.DTOs;
using MobileBankingBackend.Models;
using MobileBankingBackend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MobileBankingBackend.Services
{
    public class CreditService : ICreditService
    {
        private DatabaseContext _context;
        public CreditService(DatabaseContext context)
        {
            _context = context;
        }
        private string GetAccountNumber()
        {
            string result = "UA42";

            Random random = new Random();

            bool work = true;

            while (work)
            {
                string line = " ";

                line += $"{random.Next(100000, 999999)}  {random.Next(1000, 9999)} {random.Next(1000, 9999)} {random.Next(1000, 9999)} {random.Next(1000, 9999)} {random.Next(100, 999)}";

                if (!_context.Credits.Where(item => item.AccountNumber.Contains(String.Concat(result, line))).Any())
                {
                    work = false;
                    result += line;
                }
            }

            return result;
        }
        public ListCreditDTO AddCredit(CreditDTO credit)
        {
            var result = new ListCreditDTO();

            try
            {
                var creditDB = new Credit()
                {
                    CreatedDate = DateTime.Now,
                    CreditType = _context.CreditTypes.Where(item => item.ID == credit.CreditTypeID).FirstOrDefault(),
                    Customer = _context.Customers.Where(item => item.UserID == credit.UserID).FirstOrDefault(),
                    DateEnd = DateTime.Now.AddMonths(credit.MonthCount),
                    IsActive = false,
                    MinDraft = credit.MinDraft,
                    MonthCount = credit.MonthCount,
                    MoneyLeft = credit.MoneyLeft,
                    AccountNumber = GetAccountNumber()
                };

                var creditHistory = new CreditHistory()
                {
                    CreatedDate = DateTime.Now,
                    Credit = creditDB,
                    Deposit = 0,
                    MoneyLeft = creditDB.MoneyLeft,
                    MoneyLeftOnStart = creditDB.MoneyLeft
                };

                if (credit.CreditTypeID == 4 && !string.IsNullOrEmpty(credit.CardNumber))
                {
                    var card = _context.Cards.Where(item => item.CardNumber == credit.CardNumber).FirstOrDefault();

                    if (card == null)
                    {
                        result.Success = false;
                        result.Message = "Немає такої картки";
                        return result;
                    }

                    card.Money += credit.CreditSum;
                    _context.Cards.Update(card);
                }

                _context.CreditHistories.Add(creditHistory);
                _context.Credits.Add(creditDB);
                _context.SaveChanges();


                var credits = _context.Credits.Where(item => item.Customer.UserID == credit.UserID).Include(item => item.Customer)
                    .Include(item => item.Customer.User).Include(item => item.Customer.User.UserInformation).Include(item => item.CreditType).ToList();

                result.Credits = new List<CreditDTO>();

                foreach (var creditItem in credits)
                {
                    result.Credits.Add(new CreditDTO()
                    {
                        ID = creditItem.ID,
                        AccountNumber = creditItem.AccountNumber,
                        CreditType = creditItem.CreditType?.Name,
                        CreditTypeID = creditItem.CreditType?.ID ?? 0,
                        DateCreated = $"{creditItem.CreatedDate.ToShortDateString()} {creditItem.CreatedDate.ToShortDateString()}",
                        DateEnd = $"{creditItem.DateEnd.ToShortDateString()} {creditItem.DateEnd.ToShortDateString()}",
                        IsActive = creditItem.IsActive,
                        LastPaymentDate = $"{creditItem.LastPaymentDate.ToShortDateString()} {creditItem.LastPaymentDate.ToShortDateString()}",
                        MinDraft = creditItem.MinDraft,
                        MoneyLeft = creditItem.MoneyLeft,
                        MonthCount = creditItem.MonthCount,
                        UserID = creditItem.Customer?.User?.ID ?? 0,
                        UserName = $"{creditItem.Customer?.User?.UserInformation?.Name} {creditItem.Customer?.User?.UserInformation?.SecondName}"
                    });
                }

                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return result;
        }

        public ListCreditDTO GetCredits(int userID)
        {
            var result = new ListCreditDTO();

            try
            {
                var credits = _context.Credits.Where(item => item.Customer.UserID == userID).Include(item => item.Customer)
                    .Include(item => item.Customer.User).Include(item => item.Customer.User.UserInformation).Include(item => item.CreditType).ToList();

                result.Credits = new List<CreditDTO>();

                foreach (var creditItem in credits)
                {
                    result.Credits.Add(new CreditDTO()
                    {
                        ID = creditItem.ID,
                        AccountNumber = creditItem.AccountNumber,
                        CreditType = creditItem.CreditType?.Name,
                        CreditTypeID = creditItem.CreditType?.ID ?? 0,
                        DateCreated = $"{creditItem.CreatedDate.ToShortDateString()} {creditItem.CreatedDate.ToShortDateString()}",
                        DateEnd = $"{creditItem.DateEnd.ToShortDateString()} {creditItem.DateEnd.ToShortDateString()}",
                        IsActive = creditItem.IsActive,
                        LastPaymentDate = $"{creditItem.LastPaymentDate.ToShortDateString()} {creditItem.LastPaymentDate.ToShortDateString()}",
                        MinDraft = creditItem.MinDraft,
                        MoneyLeft = creditItem.MoneyLeft,
                        MonthCount = creditItem.MonthCount,
                        UserID = creditItem.Customer?.User?.ID ?? 0,
                        UserName = $"{creditItem.Customer?.User?.UserInformation?.Name} {creditItem.Customer?.User?.UserInformation?.SecondName}"
                    });
                }

                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return result;
        }
        public ListCreditDTO GetWorketAllCredits()
        {
            var result = new ListCreditDTO();

            try
            {
                var credits = _context.Credits.Include(item => item.Customer)
                    .Include(item => item.Customer.User).Include(item => item.Customer.User.UserInformation).Include(item => item.CreditType).ToList();

                result.Credits = new List<CreditDTO>();

                foreach (var creditItem in credits)
                {
                    result.Credits.Add(new CreditDTO()
                    {
                        ID = creditItem.ID,
                        AccountNumber = creditItem.AccountNumber,
                        CreditType = creditItem.CreditType?.Name,
                        CreditTypeID = creditItem.CreditType?.ID ?? 0,
                        DateCreated = $"{creditItem.CreatedDate.ToShortDateString()} {creditItem.CreatedDate.ToShortDateString()}",
                        DateEnd = $"{creditItem.DateEnd.ToShortDateString()} {creditItem.DateEnd.ToShortDateString()}",
                        IsActive = creditItem.IsActive,
                        LastPaymentDate = $"{creditItem.LastPaymentDate.ToShortDateString()} {creditItem.LastPaymentDate.ToShortDateString()}",
                        MinDraft = creditItem.MinDraft,
                        MoneyLeft = creditItem.MoneyLeft,
                        MonthCount = creditItem.MonthCount,
                        UserID = creditItem.Customer?.User?.ID ?? 0,
                        UserName = $"{creditItem.Customer?.User?.UserInformation?.Name} {creditItem.Customer?.User?.UserInformation?.SecondName}"
                    });
                }

                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return result;
        }
        public ListCreditDTO ActivateCredit(int creditID)
        {
            var result = new ListCreditDTO();

            try
            {
                var creditDB = _context.Credits.Where(item => item.ID == creditID).FirstOrDefault();

                if (creditDB == null)
                {
                    result.Success = false;
                    result.Message = "";
                    return result;
                }

                creditDB.IsActive = true;
                _context.Credits.Add(creditDB);
                _context.SaveChanges();

                var credits = _context.Credits.Include(item => item.Customer)
                    .Include(item => item.Customer.User).Include(item => item.Customer.User.UserInformation).Include(item => item.CreditType).ToList();

                result.Credits = new List<CreditDTO>();

                foreach (var creditItem in credits)
                {
                    result.Credits.Add(new CreditDTO()
                    {
                        ID = creditItem.ID,
                        AccountNumber = creditItem.AccountNumber,
                        CreditType = creditItem.CreditType?.Name,
                        CreditTypeID = creditItem.CreditType?.ID ?? 0,
                        DateCreated = $"{creditItem.CreatedDate.ToShortDateString()} {creditItem.CreatedDate.ToShortDateString()}",
                        DateEnd = $"{creditItem.DateEnd.ToShortDateString()} {creditItem.DateEnd.ToShortDateString()}",
                        IsActive = creditItem.IsActive,
                        LastPaymentDate = $"{creditItem.LastPaymentDate.ToShortDateString()} {creditItem.LastPaymentDate.ToShortDateString()}",
                        MinDraft = creditItem.MinDraft,
                        MoneyLeft = creditItem.MoneyLeft,
                        MonthCount = creditItem.MonthCount,
                        UserID = creditItem.Customer?.User?.ID ?? 0,
                        UserName = $"{creditItem.Customer?.User?.UserInformation?.Name} {creditItem.Customer?.User?.UserInformation?.SecondName}"
                    });
                }

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
