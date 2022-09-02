using Lotto3000.DataAccess.Abstraction;
using Lotto3000.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lotto3000.DataAccess.Repositories
{
    public class UserStaticRepository : IRepository<UserDto>
    {

        public IEnumerable<UserDto> GetAll()
        {
            return StaticDb.Users;
        }

        public UserDto GetById(int id)
        {
            return StaticDb.Users.FirstOrDefault(x => x.Id == id);
        }
        public void Create(UserDto entity)
        {
            entity.Id = StaticDb.UserIdCounter++;
            StaticDb.Users.Add(entity);
        }
        public void Update(UserDto entity, int id)
        {
            var user = GetById(id);
            user.FirstName = entity.FirstName;
            user.LastName = entity.LastName;
            user.UserName = entity.UserName;
            user.Email = entity.Email;
            user.Password = entity.Password;
        }

        public void Delete(int id)
        {
            //StaticDb.Users.Remove();
        }

    }
}
