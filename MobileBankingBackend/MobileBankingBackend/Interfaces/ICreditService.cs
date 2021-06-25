using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileBankingBackend.DTOs;

namespace MobileBankingBackend.Interfaces
{
    public interface ICreditService
    {
        public ListCreditDTO AddCredit(CreditDTO credit);
        public ListCreditDTO GetCredits(int userID);
        public ListCreditDTO GetWorketAllCredits();
        public ListCreditDTO ActivateCredit(int creditID);
    }
}
