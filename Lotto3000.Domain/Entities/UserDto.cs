using Lotto3000.InterfaceModels.Models;

namespace Lotto3000.Domain.Entities
{
    public class UserDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsAdmin { get; set; }

        public UserDto()
        {

        }
        public UserDto(string firstName, string lastName, string userName, string email, string password)
        {
            FirstName = firstName;
            LastName = lastName;
            UserName = userName;
            Email = email;
            Password = password;
            IsAdmin = false;
        }

        public void Update(UpdateUserModel model, string hashedPassword)
        {
            FirstName = model.FirstName;
            LastName = model.LastName;
            Email = model.Email;
            Password = hashedPassword;
        }
    }
}