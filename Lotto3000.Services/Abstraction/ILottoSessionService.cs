using Lotto3000.Domain.Entities;
using Lotto3000.InterfaceModels.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lotto3000.Services.Abstraction
{
    public interface ILottoSessionService
    {
        public List<LottoSessionModel> GetAll();
        public LottoSessionModel GetById(int id);
        public void Create();
    }
}
