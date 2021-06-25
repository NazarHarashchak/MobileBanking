using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileBankingBackend.DTOs;
using MobileBankingBackend.Interfaces;

namespace MobileBankingBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreditController : ControllerBase
    {
        private ICreditService _service;
        public CreditController(ICreditService service)
        {
            _service = service;
        }

        [Route("getWorkerCredits")]
        [HttpGet]
        public IActionResult GetWorkerCredits()
        {
            var result = _service.GetWorketAllCredits();
            return Ok(result);
        }

        [Route("getMyCredits/{id}")]
        [HttpGet]
        public IActionResult GetMyCredits(int id)
        {
            var result = _service.GetCredits(id);
            return Ok(result);
        }

        [Route("addCredit")]
        [HttpPost]
        public IActionResult AddCredit([FromBody] CreditDTO credit)
        {
            var result = _service.AddCredit(credit);
            return Ok(result);
        }

        [Route("activateCredit")]
        [HttpPost]
        public IActionResult AddCredit([FromBody] int creditID)
        {
            var result = _service.ActivateCredit(creditID);
            return Ok(result);
        }
    }
}
