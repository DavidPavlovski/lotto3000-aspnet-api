using Lotto3000.Configurations;
using Lotto3000.Exceptions;
using Lotto3000.InterfaceModels.Models;
using Lotto3000.Services.Abstraction;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Security.Claims;

namespace Lotto3000.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LottoTicketController : ControllerBase
    {
        private readonly ILottoTicketService _lottoTicketService;
        private readonly AppSettings _appSettings;
        public LottoTicketController(ILottoTicketService lottoTicketService, IOptions<AppSettings> options)
        {
            _lottoTicketService = lottoTicketService;
            _appSettings = options.Value;
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            try
            {
                var role = GetAuthorizedRole();
                if (role != "admin")
                {
                    throw new UserException(401, "You are not authorized to perform this action");
                }
                var res = _lottoTicketService.GetAll();
                return Ok(res);
            }
            catch (UserException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
            catch (LottoTicketException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(_appSettings.DefaultErrorMessage);
            }
        }

        [HttpGet("SessionTickets/{sessionId}")]
        public IActionResult GetSessionTickets([FromRoute] int sessionId)
        {
            try
            {
                var role = GetAuthorizedRole();
                if (role != "admin")
                {
                    throw new UserException(401, "You are not authorized to perform this action.");
                }
                var res = _lottoTicketService.GetTickets(sessionId);
                return Ok(res);
            }
            catch (UserException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
            catch (LottoTicketException ex)
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
        [AllowAnonymous]
        [HttpGet("SessionWinners/{sessionId}")]
        public IActionResult GetSessionWinners([FromRoute] int sessionId)
        {
            try
            {
                var res = _lottoTicketService.GetWinners(sessionId);
                return Ok(res);
            }
            catch (UserException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
            catch (LottoTicketException ex)
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

        [HttpGet("GetUserTickets/{userId}")]
        public IActionResult GetUserTickets([FromRoute] int userId)
        {
            try
            {
                var authorizedUserId = GetAuthorizedId();
                var role = GetAuthorizedRole();
                if (role != "admin" && authorizedUserId != userId)
                {
                    throw new UserException(401, "You are not authorized to perform this action.");
                }
                var res = _lottoTicketService.UserTickets(userId);
                return Ok(res);
            }
            catch (UserException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message); ;
            }
            catch (LottoTicketException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
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
                var authorizedUserId = GetAuthorizedId();

                var res = _lottoTicketService.GetById(id);
                if (role != "admin" && authorizedUserId != res.UserId)
                {
                    throw new UserException(401, "You are not authorized to perform this action");
                }
                return Ok(res);
            }
            catch (LottoTicketException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
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

        [HttpPost("Create")]
        public IActionResult Create([FromBody] SubmitLottoTicketModel model)
        {
            try
            {
                var authorizedUserId = GetAuthorizedId();
                var role = GetAuthorizedRole();
                if (role == "admin")
                {
                    throw new UserException(401, "Admins are not allowed to submit tickets");
                }
                _lottoTicketService.Create(model, authorizedUserId);
                return Ok("Ticket submited");
            }
            catch (UserException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
            catch (LottoTicketException ex)
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