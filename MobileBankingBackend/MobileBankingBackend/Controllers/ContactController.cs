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
    public class ContactController : ControllerBase
    {
        private readonly IContactService _service;
        public ContactController (IContactService service)
        {
            _service = service;
        }
        [Route("send")]
        [HttpPost]
        public IActionResult SaveComment([FromBody] CommentDTO comment)
        {
            var result = _service.SendComment(comment);
            return Ok(result);
        }

        [Route("getall")]
        [HttpGet]
        public IActionResult GetComments()
        {
            var result = _service.GetComments();
            return Ok(result);
        }

        [Route("read")]
        [HttpPut]
        public IActionResult MarkAsread([FromBody] int id)
        {
            var result = _service.MarkAsRead(id);
            return Ok(result);
        }
    }
}
