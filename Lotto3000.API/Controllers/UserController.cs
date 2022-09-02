using Lotto3000.Configurations;
using Lotto3000.Exceptions;
using Lotto3000.InterfaceModels.Models;
using Lotto3000.Services.Abstraction;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Security.Claims;

namespace Lotto3000.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly AppSettings _appSettings;

        public UserController(IUserService userService, IOptions<AppSettings> options)
        {
            _userService = userService;
            _appSettings = options.Value;
        }

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        public IActionResult Authenticate([FromBody] LoginUserModel model)
        {
            try
            {
                var token = _userService.Authenticate(model.Credential, model.Password);
                return Ok(token);
            }
            catch (UserException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(_appSettings.DefaultErrorMessage);
            }
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public IActionResult Create([FromBody] RegisterUserModel model)
        {

            try
            {
                _userService.Create(model);
                return Ok("User added successfully");
            }
            catch (UserException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(_appSettings.DefaultErrorMessage);
            }
        }


        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            try
            {
                var role = GetAuthorizedRole();
                if (role != "admin" || role == null)
                {
                    throw new UserException(401, "You are not authorized to perform this action.");
                }
                var res = _userService.GetAll();
                return Ok(res);
            }
            catch (UserException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(_appSettings.DefaultErrorMessage);
            }
        }

        [HttpGet("GetById/{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            try
            {
                var role = GetAuthorizedRole();
                if (role != "admin" || role == null)
                {
                    throw new UserException(401, "You are not authorized to perform this action.");
                }
                var res = _userService.GetById(id);
                return Ok(res);
            }
            catch (UserException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(_appSettings.DefaultErrorMessage);
            }
        }


        [HttpPut("Update/id/{id}")]
        public IActionResult Update([FromBody] UpdateUserModel model, [FromRoute] int id)
        {
            try
            {
                var role = GetAuthorizedRole();
                var userId = GetAuthorizedId();

                if (id != userId && role != "admin")
                {
                    throw new UserException(401, "You are not authorized to perform this action.");
                }
                _userService.Update(model, id);
                return Ok("User updated");
            }
            catch (UserException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(_appSettings.DefaultErrorMessage);

            }
        }
        [HttpDelete("Delete/id/{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            try
            {
                var role = GetAuthorizedRole();
                var authenticatedUserId = GetAuthorizedId();
                if (role != "admin")
                {
                    throw new UserException(401, "You are not authorized to perform this action.");
                }
                if(authenticatedUserId == id)
                {
                    throw new UserException(400, "Cannot delete self.");

                }
                _userService.Delete(id);
                return Ok("User deleted successfully");
            }
            catch (UserException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private string GetAuthorizedRole()
        {
            return User.FindFirst(ClaimTypes.Role).Value;
        }

        private int GetAuthorizedId()
        {
            if (!int.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out int userId))
            {
                throw new UserException(userId, "Name identifier claim does not exist!");
            }
            return userId;
        }
    }
}
