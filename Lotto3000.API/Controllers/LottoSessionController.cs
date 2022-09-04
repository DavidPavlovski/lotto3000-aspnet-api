using Lotto3000.Configurations;
using Lotto3000.Exceptions;
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
    public class LottoSessionController : ControllerBase
    {

        private readonly ILottoSessionService _lottoSessionService;
        private readonly AppSettings _appSettings;

        public LottoSessionController(ILottoSessionService lottoSessionService, IOptions<AppSettings> options)
        {
            _lottoSessionService = lottoSessionService;
            _appSettings = options.Value;
        }
        [AllowAnonymous]
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            try
            {
                var res = _lottoSessionService.GetAll();
                return Ok(res);
            }
            catch (LottoSessionException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(_appSettings.DefaultErrorMessage);
            }
        }
        [AllowAnonymous]
        [HttpGet("GetById/{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            try
            {
                var res = _lottoSessionService.GetById(id);
                return Ok(res);
            }
            catch (LottoSessionException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(_appSettings.DefaultErrorMessage);
            }
        }

        [HttpPost("Create")]
        public IActionResult Create()
        {
            try
            {
                var role = GetAuthorizedRole();
                if (role != "admin")
                {
                    throw new UserException(401, "You are not authorized to perform this action.");
                }
                var res = _lottoSessionService.Create();
                return Ok(res);
            }
            catch (UserException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
            catch(LottoTicketException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);

            }
            catch (LottoSessionException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(_appSettings.DefaultErrorMessage);
            }
        }

        private string GetAuthorizedRole()
        {
            return User.FindFirst(ClaimTypes.Role).Value;
        }
    }
}
