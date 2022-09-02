﻿using Lotto3000.DataAccess.Abstraction;
using Lotto3000.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lotto3000.DataAccess.Repositories
{
    public class LottoTicketRepository : IRepository<LottoTicketDto>
    {

        private readonly Lotto3000DbContext _dbContext;

        public LottoTicketRepository(Lotto3000DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<LottoTicketDto> GetAll()
        {
            return _dbContext.LottoTickets.Include(x => x.User).Include(x => x.LottoSession).AsNoTracking();
        }

        public LottoTicketDto GetById(int id)
        {
            return _dbContext.LottoTickets.Include(x => x.User).Include(x => x.LottoSession).FirstOrDefault(x => x.Id == id);

        }
        public void Create(LottoTicketDto entity)
        {
            _dbContext.LottoTickets.Add(entity);
            _dbContext.SaveChanges();
        }
        public void Update(LottoTicketDto entity, int id)
        {
            _dbContext.LottoTickets.Update(entity);
            _dbContext.SaveChanges();
        }
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }


    }
}