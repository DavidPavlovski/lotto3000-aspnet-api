using Lotto3000.InterfaceModels.Models;

namespace Lotto3000.Services.Abstraction
{
    public interface ILottoTicketService
    {
        List<LottoTicketModel> GetAll();
        List<LottoTicketModel> GetTickets(int sessionId);
        List<LottoTicketModel> GetWinners(int sessionId);
        List<LottoTicketModel> UserTickets(int userId);
        LottoTicketModel GetById(int id);
        void Create(SubmitLottoTicketModel model, int userId);
    }
}
