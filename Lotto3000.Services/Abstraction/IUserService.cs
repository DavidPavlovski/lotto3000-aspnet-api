using Lotto3000.InterfaceModels.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lotto3000.Services.Abstraction
{
    public interface IUserService
    {
        public string Authenticate(string credential, string password);
        public List<UserModel> GetAll();
        public UserModel GetById(int id);
        public void Create(RegisterUserModel model);
        public void Update(UpdateUserModel model, int id);
        public void Delete(int id);
    }
}
