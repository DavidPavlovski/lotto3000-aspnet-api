using Lotto3000.DataAccess.Abstraction;
using Lotto3000.Domain.Entities;

namespace Lotto3000.DataAccess.Repositories
{
    public class LottoSessionRepository : IRepository<LottoSessionDto>
    {
        private readonly Lotto3000DbContext _dbContext;

        public LottoSessionRepository(Lotto3000DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<LottoSessionDto> GetAll()
        {
            return _dbContext.LottoSessions;
        }

        public LottoSessionDto GetById(int id)
        {
            return _dbContext.LottoSessions.FirstOrDefault(x => x.Id == id);
        }
        public void Create(LottoSessionDto entity)
        {
            _dbContext.LottoSessions.Add(entity);
            _dbContext.SaveChanges();
        }

        public void Update(LottoSessionDto entity)
        {
            throw new NotImplementedException();
        }
        public void Update(List<LottoSessionDto> entities)
        {
            throw new NotImplementedException();
        }


        public void Delete(LottoSessionDto entity)
        {
            throw new NotImplementedException();
        }

       
    }
}
