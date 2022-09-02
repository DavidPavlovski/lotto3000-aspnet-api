using Lotto3000.DataAccess.Abstraction;
using Lotto3000.Domain.Entities;
using Lotto3000.Exceptions;
using Lotto3000.Helpers;
using Lotto3000.InterfaceModels.Models;
using Lotto3000.Mappers;
using Lotto3000.Services.Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lotto3000.Services.Implementation
{
    public class LottoTicketService : ILottoTicketService
    {

        private readonly IRepository<LottoTicketDto> _lottoTicketRepository;
        private readonly IRepository<UserDto> _userRepository;

        public LottoTicketService(IRepository<LottoTicketDto> lottoTicketRepository, IRepository<UserDto> userRepository)
        {
            _lottoTicketRepository = lottoTicketRepository;
            _userRepository = userRepository;
        }

        public List<LottoTicketModel> GetAll()
        {
            return _lottoTicketRepository.GetAll().Select(x => x.ToLottoTicketModel()).ToList();
        }

        public List<LottoTicketModel> GetTickets(int sessionId)
        {
            return _lottoTicketRepository.GetAll().Where(x => x.LottoSessionId == sessionId).Select(x => x.ToLottoTicketModel()).ToList();
        }

        public List<LottoTicketModel> GetWinners(int sessionId)
        {
            return _lottoTicketRepository.GetAll().Select(x => x.ToLottoTicketModel()).Where(x => x.LottoSessionId == sessionId && x.GuessedNumbers >= 3).ToList();
        }
        public List<LottoTicketModel> UserTickets(int userId)
        {
            if (_userRepository.GetById(userId) == null)
            {
                throw new UserException(404, userId, $"User with Id:{userId} does not exist.");
            }

            return _lottoTicketRepository.GetAll().Where(x => x.UserId == userId).Select(x => x.ToLottoTicketModel()).ToList();
        }
        public LottoTicketModel GetById(int id)
        {
            var res = _lottoTicketRepository.GetById(id);
            if (res == null)
            {
                throw new LottoTicketException(id, $"Ticket with Id : {id} does not exist.");
            }
            return res.ToLottoTicketModel();
        }
        public void Create(SubmitLottoTicketModel model, int userId)
        {
            if (!model.Combination.Replace(",", "").All(char.IsDigit))
            {
                throw new LottoTicketException(400, "Lotto ticket cannot contain letters");
            }
            var combination = model.Combination.StringToList().OrderBy(x => x).ToList();
            if (combination.Count != 7)
            {
                throw new LottoTicketException(400, "You must enter exactly 7 numbers in the ticket");
            }
            var lottoTicket = new LottoTicketDto(userId, combination.ListToString());
            _lottoTicketRepository.Create(lottoTicket);
        }


    }
}
