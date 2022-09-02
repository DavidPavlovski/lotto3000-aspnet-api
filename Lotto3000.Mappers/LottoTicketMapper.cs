using Lotto3000.Domain.Entities;
using Lotto3000.Helpers;
using Lotto3000.InterfaceModels.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lotto3000.Mappers
{
    public static class LottoTicketMapper
    {
        public static LottoTicketDto ToLottoTicketDto(this LottoTicketModel model)
        {
            return new LottoTicketDto
            {
                UserId = model.UserId,
                User = model.User.ToUserDto(),
                Combination = model.Combination.ListToString(),
                Created = model.Created,
                LottoSessionId = model.LottoSessionId,
                LottoSession = model.LottoSession.ToLottoSessionDto(),
            };
        }

        public static LottoTicketModel ToLottoTicketModel(this LottoTicketDto model)
        {
            return new LottoTicketModel
            {
                Id = model.Id,
                UserId = model.UserId,
                User = model.User.ToUserModel(),
                Combination = model.Combination.StringToList(),
                Created = model.Created,
                LottoSessionId = model.LottoSessionId,
                LottoSession = model.LottoSessionId == null ? null : model.LottoSession.ToLottoModel(),
                GuessedNumbers = model.LottoSessionId == null ? 0 : model.LottoSession.WinningNumbers.StringToList().Intersect(model.Combination.StringToList()).Count()
            };
        }
    }
}
