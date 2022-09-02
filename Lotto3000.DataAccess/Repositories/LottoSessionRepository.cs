using Lotto3000.DataAccess.Abstraction;
using Lotto3000.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
