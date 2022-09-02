using Lotto3000.DataAccess.Abstraction;
using Lotto3000.Domain.Entities;

namespace Lotto3000.DataAccess.Repositories
{
    public class LottoSessionStaticRepository : IRepository<LottoSessionDto>
    {
        public IEnumerable<LottoSessionDto> GetAll()
        {
            return StaticDb.LottoSessions;
        }

        public LottoSessionDto GetById(int id)
        {
            return StaticDb.LottoSessions.SingleOrDefault(x => x.Id == id);
        }
        public void Create(LottoSessionDto entity)
        {
            entity.Id = StaticDb.LottoSessionCounter++;
            StaticDb.LottoSessions.Add(entity);
        }

        public void Update(LottoSessionDto entity, int id)
        {
            throw new NotImplementedException();
        }
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

    }
}
