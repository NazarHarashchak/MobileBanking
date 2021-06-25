using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileBankingBackend.Models;
using MobileBankingBackend.DTOs;

namespace MobileBankingBackend.Interfaces
{
    public interface ICardService
    {
        public CardTypeDTO GetAllTypes();
        public CardDTO GetNewCard(CardDTO card);
        public ListCardsDTO GetAllCards();
        public ListCardsDTO GetInactiveCards();
        public ListCardsDTO ProceedCard(CardDTO card);
        public ListCardsDTO BlockCard(CardDTO card);
        public ListCardsDTO DeleteCard(int card);
        public ListCardsDTO GetUserCards(int userID);
    }
}
