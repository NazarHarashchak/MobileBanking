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
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        public UserController(IUserService service)
        {
            _service = service;
        }

        [Route("getuser/{id}")]
        [HttpGet]
        public IActionResult GetUser(int id)
        {
            var result = _service.GetUser(id);
            return Ok(result);
        }

        [Route("getallusers")]
        [HttpGet]
        public IActionResult GetUsers()
        {
            var result = _service.GetAllUsers();
            return Ok(result);
        }

        [Route("Worker/getusers")]
        [HttpGet]
        public IActionResult GetusersForWorker()
        {
            var result = _service.GetUsersForWorker();
            return Ok(result);
        }

        [Route("Worker/getuser/{userID}")]
        [HttpGet]
        public IActionResult GetuserForWorker(int userID)
        {
            var result = _service.GetCustomerData(userID);
            return Ok(result);
        }

        [Route("saveuser")]
        [HttpPost]
        public IActionResult SaveUser([FromBody] UserDTO user)
        {
            var result = _service.SaveUser(user);
            return Ok(result);
        }

        [Route("blockuser")]
        [HttpPost]
        public IActionResult BlockUser([FromBody] int userID)
        {
            var result = _service.BlockUser(userID);
            return Ok(result);
        }

        [Route("edituser")]
        [HttpPost]
        public IActionResult EditUser([FromBody] UserDTO user)
        {
            var result = _service.EditUserData(user);
            return Ok(result);
        }

        [Route("editmyuserdata")]
        [HttpPost]
        public IActionResult EditMyUserData([FromBody] UserDTO user)
        {
            var result = _service.EditMyUserData(user);
            return Ok(result);
        }

        [Route("SavePassport")]
        [HttpPost]
        public IActionResult SavePassportData([FromBody] CustomerDTO customerDTO)
        {
            var result = _service.SaveUserPassportData(customerDTO);
            return Ok(result);
        }
    }
}
