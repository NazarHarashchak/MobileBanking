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
    public class AuthentificationController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly IAuthentificationService _service;
        public AuthentificationController (DatabaseContext context, IAuthentificationService service)
        {
            _context = context;
            _service = service;
        }

        [Route("authentificate")]
        [HttpPost]
        public IActionResult AuthentificateUser ([FromBody] AuthentificationDTO user)
        {
            var result = _service.Authentificate(user);
            return Ok(result);
        }

        [Route("registrate")]
        [HttpPost]
        public IActionResult RegistrateUser ([FromBody] AuthentificationDTO user)
        {
            var result = _service.Registrate(user);
            return Ok(result);
        }
    }
}
