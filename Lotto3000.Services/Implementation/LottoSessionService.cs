using Lotto3000.DataAccess.Abstraction;
using Lotto3000.Domain.Entities;
using Lotto3000.Exceptions;
using Lotto3000.InterfaceModels.Models;
using Lotto3000.Mappers;
using Lotto3000.Services.Abstraction;

namespace Lotto3000.Services.Implementation
{
    public class LottoSessionService : ILottoSessionService
    {

        private readonly IRepository<LottoSessionDto> _lottoSessionRepository;
        private readonly IRepository<LottoTicketDto> _lottoTicketRepository;

        public LottoSessionService(IRepository<LottoSessionDto> lottoSessionRepository, IRepository<LottoTicketDto> lottoTicketRepository)
        {
            _lottoSessionRepository = lottoSessionRepository;
            _lottoTicketRepository = lottoTicketRepository;
        }
        public List<LottoSessionModel> GetAll()
        {
            return _lottoSessionRepository.GetAll().Select(x => x.ToLottoModel()).ToList();
        }

        public LottoSessionModel GetById(int id)
        {
            var res = _lottoSessionRepository.GetById(id);
            if (res == null)
            {
                throw new LottoSessionException(404, id, $"Lotto session with Id : {id} does not exist");
            }
            return res.ToLottoModel();
        }
        public LottoSessionModel Create()
        {
            var combination = GenerateLottoCombination();
            var model = new LottoSessionDto(combination);
            var currentSessionTickets = _lottoTicketRepository.GetAll().Where(x => x.LottoSessionId == null).ToList();
            if(currentSessionTickets.Count == 0)
            {
                throw new LottoTicketException(400, "No tickets submited.");
            }
            _lottoSessionRepository.Create(model);
            currentSessionTickets.ForEach(x =>
            {
                x.LottoSessionId = model.Id;
            });
            _lottoTicketRepository.Update(currentSessionTickets);
            return model.ToLottoModel();
        }

        private string GenerateLottoCombination()
        {
            var random = new Random();
            List<int> combination = new List<int>();
            while (combination.Count < 7)
            {
                int number = random.Next(1, 38);
                if (combination.Any(x => x == number))
                {
                    continue;
                }
                combination.Add(number);
            }

            return string.Join(",", combination.OrderBy(x => x).ToArray());
        }
    }
}

