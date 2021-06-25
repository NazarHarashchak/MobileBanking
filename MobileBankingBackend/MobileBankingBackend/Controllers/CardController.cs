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
    public class CardController : ControllerBase
    {
        private ICardService _service;
        public CardController(ICardService service)
        {
            _service = service;
        }

        [Route("gettypes")]
        [HttpGet]
        public IActionResult GetAllTypes()
        {
            var result = _service.GetAllTypes();
            return Ok(result);
        }

        [Route("getcards/{userID}")]
        [HttpGet]
        public IActionResult GetAllCards(int userID)
        {
            var result = _service.GetUserCards(userID);
            return Ok(result);
        }

        [Route("getallcards")]
        [HttpGet]
        public IActionResult GetAllCardsWorker()
        {
            var result = _service.GetAllCards();
            return Ok(result);
        }

        [Route("getinactivecards")]
        [HttpGet]
        public IActionResult GetAllinactiveCards()
        {
            var result = _service.GetInactiveCards();
            return Ok(result);
        }

        [Route("BlockCards")]
        [HttpPost]
        public IActionResult BlockCard([FromBody] CardDTO card)
        {
            var result = _service.BlockCard(card);
            return Ok(result);
        }

        [Route("ActivateCard")]
        [HttpPost]
        public IActionResult ActivateCard([FromBody] CardDTO card)
        {
            var result = _service.ProceedCard(card);
            return Ok(result);
        }

        [Route("GetNewCard")]
        [HttpPost]
        public IActionResult GetNewCard([FromBody] CardDTO card)
        {
            var result = _service.GetNewCard(card);
            return Ok(result);
        }

        [Route("deleteCard/{cardID}")]
        [HttpDelete]
        public IActionResult DeleteCard(int cardID)
        {
            var result = _service.DeleteCard(cardID);
            return Ok(result);
        }
    }
}
