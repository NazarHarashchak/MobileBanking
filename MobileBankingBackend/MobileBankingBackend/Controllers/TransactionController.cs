using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileBankingBackend.Interfaces;
using MobileBankingBackend.DTOs;

namespace MobileBankingBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private ITransactionService _service;

        public TransactionController(ITransactionService service)
        {
            _service = service;
        }

        [Route("getalltransactins/{id}")]
        [HttpGet]
        public IActionResult GetAllTransactions(int id)
        {
            var result = _service.GetTransactions(id);
            return Ok(result);
        }

        [Route("addtransaction")]
        [HttpPost]
        public IActionResult AddTransaction([FromBody] TransactionDTO transaction)
        {
            var result = _service.AddTransaction(transaction);
            return Ok(result);
        }

        [Route("findtransaction")]
        [HttpPost]
        public IActionResult FindTransaction([FromBody] string transactionID)
        {
            var result = _service.FindTransaction(transactionID);
            return Ok(result);
        }
    }
}
