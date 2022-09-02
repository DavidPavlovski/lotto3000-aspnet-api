using Lotto3000.DataAccess.Abstraction;
using Lotto3000.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
