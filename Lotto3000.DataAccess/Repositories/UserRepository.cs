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
        public void Update(UserDto entity, int id)
        {
            _dbContext.Update(entity);
            _dbContext.SaveChanges();
        }
        public void Delete(int id)
        {
            _dbContext.Users.Remove(GetById(id));
            _dbContext.SaveChanges();
        }
    }
}
