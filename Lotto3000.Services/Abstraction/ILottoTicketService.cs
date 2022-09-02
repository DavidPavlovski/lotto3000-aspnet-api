using Lotto3000.Domain.Entities;
using Lotto3000.InterfaceModels.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lotto3000.Services.Abstraction
{
    public interface ILottoTicketService
    {
        List<LottoTicketModel> GetAll();
        List<LottoTicketModel> GetTickets(int sessionId);
        List<LottoTicketModel> GetWinners(int sessionId);
        List<LottoTicketModel> UserTickets(int userId);
        LottoTicketModel GetById(int id);
        void Create(SubmitLottoTicketModel model , int userId);
    }
}
