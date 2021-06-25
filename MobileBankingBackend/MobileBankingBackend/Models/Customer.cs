using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.Models
{
    public class Customer
    {
        public int ID { get; set; }
        public int ? UserID { get; set; }
        public User User { get; set; }
        public Guid AccountNumber { get; set; }
        public string PassportCode { get; set; }
        public string PassportNumber { get; set; }
        public string TaxCode { get; set; }
        public string PassportImageFirstPage { get; set; }
        public bool IsPassportImageFirstPageRight { get; set; }
        public string PassportImageSecondPage { get; set; }
        public bool IsPassportImageSecondPageRight { get; set; }
        public string PassportImageAddressPage1 { get; set; }
        public bool IsPassportImageAddressPage1Right { get; set; }
        public string PassportImageAddressPage2 { get; set; }
        public bool IsPPassportImageAddressPage2Right { get; set; }
        public string TaxCodeImage { get; set; }
        public bool IsTaxCodeImageRight { get; set; }
        public List<Card> Cards { get; set; }
        public Customer()
        {
            Cards = new List<Card>();
        }
    }
}
