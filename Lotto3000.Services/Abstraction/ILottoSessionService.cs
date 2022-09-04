using Lotto3000.InterfaceModels.Models;

namespace Lotto3000.Services.Abstraction
{
    public interface ILottoSessionService
    {
        public List<LottoSessionModel> GetAll();
        public LottoSessionModel GetById(int id);
        public LottoSessionModel Create();
    }
}
