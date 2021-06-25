using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileBankingBackend.Models;
using MobileBankingBackend.DTOs;
using MobileBankingBackend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MobileBankingBackend.Services
{
    public class CardService : ICardService
    {
        private DatabaseContext _context;
        public CardService(DatabaseContext context)
        {
            _context = context;
        }
        private int GetCvv()
        {
            Random random = new Random();
            return random.Next(100, 999);
        }
        private string GetNewCardNumber()
        {
            string layout = "44788888";

            string result = layout.ToString();

            var cards = _context.Cards.ToList();

            Random random = new Random();

            bool check = true;
            while (check)
            {
                string next = random.Next(10000000, 99999999).ToString();
                if (!cards.Where(item => item.CardNumber == String.Concat(result, next.ToString())).Any())
                {
                    result += next.ToString();
                    check = false;
                }
            }

            return result;
        }
        public CardTypeDTO GetAllTypes()
        {
            var result = new CardTypeDTO();

            try
            {
                var items = _context.CardTypes.ToList();

                result.CardTypes = items;

                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Success = false;
            }

            return result;
        }
        public CardDTO GetNewCard(CardDTO card)
        {
            var result = new CardDTO();

            try
            {
                var cardDB = new Card();

                cardDB.CardNumber = GetNewCardNumber();
                cardDB.CreatedDate = DateTime.Now;
                cardDB.EndMonth = DateTime.Now.Month;
                cardDB.EndYear = DateTime.Now.Year + 4;
                cardDB.CVV = GetCvv();

                cardDB.IsActive = false;

                cardDB.Customer = _context.Customers.Where(item => item.UserID == card.UserID).First();
                cardDB.CardType = _context.CardTypes.Where(item => item.ID == card.CardTypeID).First();

                cardDB.Money = 0;

                _context.Cards.Add(cardDB);
                _context.SaveChanges();

                result = new CardDTO()
                {
                    ID = cardDB.ID,
                    DateCreated = $"{cardDB.CreatedDate.ToShortDateString()} {cardDB.CreatedDate.ToShortTimeString()}",
                    CardNumber = cardDB.CardNumber,
                    CardTypeID = cardDB.CardType.ID,
                    CVV = cardDB.CVV,
                    IsActive = false,
                    EndMonth = cardDB.EndMonth,
                    EndYear = cardDB.EndYear,
                    UserID = cardDB.Customer.UserID ?? 0
                };

                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Success = false;
            }
            return result;
        }
        public ListCardsDTO DeleteCard(int cardID)
        {
            var result = new ListCardsDTO();

            try
            {
                var card = _context.Cards.Where(item => item.ID == cardID).Include(item => item.Customer).FirstOrDefault();

                int userID = card.Customer.UserID ?? 0;

                if (card == null)
                {
                    result.Message = "Такої картки не існує!";
                    result.Success = false;
                    return result;
                }

                _context.Cards.Remove(card);
                _context.SaveChanges();

                var cards = _context.Cards.Where(item => item.Customer.UserID == userID).Include(item => item.Customer).Include(item => item.CardType).ToList();

                result.Cards = new List<CardDTO>();

                foreach(var cardItem in cards)
                {
                    result.Cards.Add(new CardDTO()
                    {
                        ID = cardItem.ID,
                        CardNumber = cardItem.CardNumber,
                        CVV = cardItem.CVV,
                        DateCreated = $"{cardItem.CreatedDate.ToShortDateString()} {cardItem.CreatedDate.ToShortTimeString()}",
                        EndMonth = cardItem.EndMonth,
                        EndYear = cardItem.EndYear,
                        IsActive = cardItem.IsActive,
                        Money = cardItem.Money,
                        UserID = cardItem.Customer.UserID ?? 0,
                        CardTypeID = cardItem.CardType.ID
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

        public ListCardsDTO GetUserCards(int userID)
        {
            var result = new ListCardsDTO();

            try
            {
                var cards = _context.Cards.Where(item => item.Customer.UserID == userID).Include(item => item.Customer).Include(item => item.CardType).ToList();

                result.Cards = new List<CardDTO>();

                foreach (var cardItem in cards)
                {
                    result.Cards.Add(new CardDTO()
                    {
                        ID = cardItem.ID,
                        CardNumber = cardItem.CardNumber,
                        CVV = cardItem.CVV,
                        DateCreated = $"{cardItem.CreatedDate.ToShortDateString()} {cardItem.CreatedDate.ToShortTimeString()}",
                        EndMonth = cardItem.EndMonth,
                        EndYear = cardItem.EndYear,
                        IsActive = cardItem.IsActive,
                        Money = cardItem.Money,
                        UserID = cardItem.Customer.UserID ?? 0,
                        CardTypeID = cardItem.CardType.ID
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
        public ListCardsDTO GetAllCards()
        {
            var result = new ListCardsDTO();

            try
            {
                var cards = _context.Cards.Where(item => item.IsActive == true).Include(item => item.CardType)
                    .Include(item => item.Customer).Include(item => item.Customer.User).Include(item => item.Customer.User.UserInformation).ToList();

                result.Cards = new List<CardDTO>();

                foreach(var card in cards)
                {
                    result.Cards.Add(new CardDTO() { 
                        CardNumber = card.CardNumber,
                        CardTypeID = card.CardType.ID,
                        DateCreated = $"{card.CreatedDate.ToShortDateString()} {card.CreatedDate.ToShortTimeString()}",
                        ID = card.ID,
                        IsActive = card.IsActive,
                        UserID = card.Customer?.User?.ID ?? 0,
                        UserFullName = $"{card.Customer?.User?.UserInformation?.Name} {card.Customer?.User?.UserInformation?.SecondName} "
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
        public ListCardsDTO GetInactiveCards()
        {
            var result = new ListCardsDTO();

            try
            {
                var cards = _context.Cards.Where(item => item.IsActive == false).Include(item => item.CardType)
                    .Include(item => item.Customer).Include(item => item.Customer.User).Include(item => item.Customer.User.UserInformation).ToList();

                result.Cards = new List<CardDTO>();

                foreach (var card in cards)
                {
                    result.Cards.Add(new CardDTO()
                    {
                        CardNumber = card.CardNumber,
                        CardTypeID = card.CardType.ID,
                        DateCreated = $"{card.CreatedDate.ToShortDateString()} {card.CreatedDate.ToShortTimeString()}",
                        ID = card.ID,
                        IsActive = card.IsActive,
                        UserID = card.Customer?.User?.ID ?? 0,
                        UserFullName = $"{card.Customer?.User?.UserInformation?.Name} {card.Customer?.User?.UserInformation?.SecondName} "
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
        public ListCardsDTO ProceedCard(CardDTO cardDTO)
        {
            var result = new ListCardsDTO();

            try
            {
                var cardDB = _context.Cards.Where(item => item.ID == cardDTO.ID).FirstOrDefault();

                if (cardDB == null)
                {
                    result.Message = "Картки не існує!";
                    result.Success = false;
                    return result;
                }

                cardDB.IsActive = true;

                _context.Cards.Update(cardDB);
                _context.SaveChanges();

                var cards = _context.Cards.Where(item => item.IsActive == false).Include(item => item.CardType)
                    .Include(item => item.Customer).Include(item => item.Customer.User).Include(item => item.Customer.User.UserInformation).ToList();

                result.Cards = new List<CardDTO>();

                foreach (var card in cards)
                {
                    result.Cards.Add(new CardDTO()
                    {
                        CardNumber = card.CardNumber,
                        CardTypeID = card.CardType.ID,
                        DateCreated = $"{card.CreatedDate.ToShortDateString()} {card.CreatedDate.ToShortTimeString()}",
                        ID = card.ID,
                        IsActive = card.IsActive,
                        UserID = card.Customer?.User?.ID ?? 0,
                        UserFullName = $"{card.Customer?.User?.UserInformation?.Name} {card.Customer?.User?.UserInformation?.SecondName} "
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
        public ListCardsDTO BlockCard(CardDTO cardDTO)
        {
            var result = new ListCardsDTO();

            try
            {
                var cardDB = _context.Cards.Where(item => item.ID == cardDTO.ID).FirstOrDefault();

                if (cardDB == null)
                {
                    result.Message = "Картки не існує!";
                    result.Success = false;
                    return result;
                }

                cardDB.IsActive = false;

                _context.Cards.Update(cardDB);
                _context.SaveChanges();

                var cards = _context.Cards.Where(item => item.IsActive == false).Include(item => item.CardType)
                    .Include(item => item.Customer).Include(item => item.Customer.User).Include(item => item.Customer.User.UserInformation).ToList();

                result.Cards = new List<CardDTO>();

                foreach (var card in cards)
                {
                    result.Cards.Add(new CardDTO()
                    {
                        CardNumber = card.CardNumber,
                        CardTypeID = card.CardType.ID,
                        DateCreated = $"{card.CreatedDate.ToShortDateString()} {card.CreatedDate.ToShortTimeString()}",
                        ID = card.ID,
                        IsActive = card.IsActive,
                        UserID = card.Customer?.User?.ID ?? 0,
                        UserFullName = $"{card.Customer?.User?.UserInformation?.Name} {card.Customer?.User?.UserInformation?.SecondName} "
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

    }
}
