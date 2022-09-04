using Lotto3000.DataAccess.Abstraction;
using Lotto3000.Domain.Entities;

namespace Lotto3000.DataAccess.Repositories
{
    public class UserRepository : IRepository<UserDto>
    {
        private readonly Lotto3000DbContext _dbContext;

        public UserRepository(Lotto3000DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<UserDto> GetAll()
        {
            return _dbContext.Users;
        }

        public UserDto GetById(int id)
        {
            return _dbContext.Users.FirstOrDefault(x => x.Id == id);
        }
        public void Create(UserDto entity)
        {
            _dbContext.Users.Add(entity);
            _dbContext.SaveChanges();
        }
        public void Update(UserDto entity)
        {
            _dbContext.Update(entity);
            _dbContext.SaveChanges();
        }
        public void Update(List<UserDto> entities)
        {
            throw new NotImplementedException();
        }

        public void Delete(UserDto entity)
        {
            _dbContext.Users.Remove(entity);
            _dbContext.SaveChanges();
        }

       
    }
}
