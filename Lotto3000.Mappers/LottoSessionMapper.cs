using Lotto3000.Domain.Entities;
using Lotto3000.InterfaceModels.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lotto3000.Mappers
{
    public static class LottoSessionMapper
    {
        public static LottoSessionDto ToLottoSessionDto(this LottoSessionModel model)
        {
            return new LottoSessionDto
            {
                WinningNumbers = string.Join(",",model.WinningNumbers.ToArray()),
                DrawDate = model.DrawDate,
            };
        }

        public static LottoSessionModel ToLottoModel(this LottoSessionDto model)
        {
            return new LottoSessionModel
            {
                Id = model.Id,
                WinningNumbers = model.WinningNumbers.Split(",").Select(x => int.Parse(x)).ToList(),
                DrawDate = model.DrawDate,
            };
        }
    }
}
