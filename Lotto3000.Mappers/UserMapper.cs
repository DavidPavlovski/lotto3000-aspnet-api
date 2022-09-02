using Lotto3000.Domain.Entities;
using Lotto3000.InterfaceModels.Models;

namespace Lotto3000.Mappers
{
    public static class UserMapper
    {
        public static UserDto ToUserDto(this UserModel model)
        {
            return new UserDto
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                UserName = model.UserName,
                Password = model.Password,
                IsAdmin = model.IsAdmin
            };
        }

        public static UserModel ToUserModel(this UserDto model)
        {
            return new UserModel
            {
                Id = model.Id,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                UserName = model.UserName,
                Password = model.Password,
                IsAdmin = model.IsAdmin
            };
        }
    }
}
