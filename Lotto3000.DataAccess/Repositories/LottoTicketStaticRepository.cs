using Lotto3000.DataAccess.Abstraction;
using Lotto3000.Domain.Entities;

namespace Lotto3000.DataAccess.Repositories
{
    public class LottoTicketStaticRepository : IRepository<LottoTicketDto>
    {

        public IEnumerable<LottoTicketDto> GetAll()
        {
            return StaticDb.LottoTickets;
        }
        public LottoTicketDto GetById(int id)
        {
            return StaticDb.LottoTickets.SingleOrDefault(x => x.Id == id);
        }
        public void Create(LottoTicketDto entity)
        {
            entity.Id = StaticDb.LottoTicketCounter++;
            StaticDb.LottoTickets.Add(entity);
        }
        public void Update(LottoTicketDto entity, int id)
        {
            throw new NotImplementedException();
        }
        public void Delete(LottoTicketDto entity)
        {
            throw new NotImplementedException();
        }
    }
}
