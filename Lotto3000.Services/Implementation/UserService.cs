using Lotto3000.Configurations;
using Lotto3000.DataAccess.Abstraction;
using Lotto3000.Domain.Entities;
using Lotto3000.Exceptions;
using Lotto3000.Helpers;
using Lotto3000.InterfaceModels.Models;
using Lotto3000.Mappers;
using Lotto3000.Services.Abstraction;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace Lotto3000.Services.Implementation
{
    public class UserService : IUserService
    {
        private readonly IRepository<UserDto> _userRepository;
        private readonly AppSettings _appSettings;

        public UserService(IRepository<UserDto> userRepository, IOptions<AppSettings> appSettings)
        {
            _userRepository = userRepository;
            _appSettings = appSettings.Value;
        }
        public string Authenticate(string credential, string password)
        {
            var hashedPassword = PasswordHasher.HashPassword(password);

            var user = _userRepository.GetAll().FirstOrDefault(x => (x.UserName == credential || x.Email == credential) && x.Password == hashedPassword);
            if (user == null)
            {
                throw new UserException(400, "Wrong login credentials.");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(
                        new[]
                        {
                            new Claim(ClaimTypes.Name , user.UserName),
                            new Claim(ClaimTypes.GivenName , user.FirstName),
                            new Claim(ClaimTypes.Surname , user.LastName),
                            new Claim(ClaimTypes.Email, user.Email),
                            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                            new Claim(ClaimTypes.Role , user.IsAdmin ? "admin" : "user")
                        }
                    ),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
        public List<UserModel> GetAll()
        {
            return _userRepository.GetAll().Select(x => x.ToUserModel()).ToList();
        }
        public UserModel GetById(int id)
        {
            var res = _userRepository.GetById(id);
            if (res == null)
            {
                throw new UserException(404, id, $"User with Id:{id} does not exist");
            }
            return res.ToUserModel();
        }
        public void Create(RegisterUserModel model)
        {
            ValidateModel(model);
            var user = new UserDto(model.FirstName, model.LastName, model.UserName, model.Email, PasswordHasher.HashPassword(model.Password));
            _userRepository.Create(user);
        }
        public void Update(UpdateUserModel model, int id)
        {
            var user = _userRepository.GetById(id);
            if (user == null)
            {
                throw new UserException(id, $"User does not exist");
            }
            if (PasswordHasher.HashPassword(model.OldPassword) != user.Password)
            {
                throw new UserException(400, "Incorrect password");
            }
            ValidateUpdateModel(model, id);
            user.Update(model, PasswordHasher.HashPassword(model.NewPassword));
            _userRepository.Update(user, id);
        }
        public void Delete(int id)
        {
            var user = _userRepository.GetById(id);
            if (user == null)
            {

                throw new UserException(404, id, $"User with Id:{id} does not exist");
            }
            _userRepository.Delete(user);
        }

        private bool IsUsernameUsed(string username)
        {
            return _userRepository.GetAll().Any(x => x.UserName == username);
        }
        private bool IsEmailValid(string email)
        {
            Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
            Match match = regex.Match(email);
            return match.Success;
        }
        private bool IsEmailUsed(string email)
        {
            return _userRepository.GetAll().Any(x => x.Email == email);
        }

        private bool IsPasswordValid(string password)
        {
            var passwordRegex = new Regex("^(?=.*[0-9])(?=.*[a-z]).{6,20}$");
            var match = passwordRegex.Match(password);
            return match.Success;
        }

        private bool IsUsernameValid(string username)
        {
            var usernameRegex = new Regex(@"^[A-z][A-z0-9-_]{5,24}$");
            var match = usernameRegex.Match(username);
            return match.Success;
        }

        private void ValidateUpdateModel(UpdateUserModel model, int id)
        {
            if (string.IsNullOrEmpty(model.FirstName))
            {
                throw new UserException(40, "First name is requiered.");
            }
            if (string.IsNullOrEmpty(model.LastName))
            {
                throw new UserException(40, "Last name is requiered.");
            }
            if (string.IsNullOrEmpty(model.Email))
            {
                throw new UserException(40, "Email is requiered.");
            }
            if (!IsEmailValid(model.Email))
            {
                throw new UserException(40, "Please enter a valid email format.");
            }
            if (IsEmailUsed(model.Email) && _userRepository.GetAll().Any(x => x.Email == model.Email && x.Id != id))
            {
                throw new UserException(40, "Email is already used.");
            }
            if (string.IsNullOrEmpty(model.NewPassword))
            {
                throw new UserException(40, "Password cannot be empty");
            }
            if (model.NewPassword != model.ConfirmNewPassword)
            {
                throw new UserException(40, "Passwords do not match");
            }
            if (!IsPasswordValid(model.NewPassword))
            {
                throw new UserException(40, "Please enter a valid password format");
            }
        }

        private void ValidateModel(RegisterUserModel model)
        {
            if (string.IsNullOrEmpty(model.FirstName))
            {
                throw new UserException(400, "First name is requiered.");
            }
            if (string.IsNullOrEmpty(model.LastName))
            {
                throw new UserException(400, "Last name is requiered.");
            }
            if (string.IsNullOrEmpty(model.UserName))
            {
                throw new UserException(400, "Username is requiered.");
            }
            if (IsUsernameUsed(model.UserName))
            {
                throw new UserException(400, "Username is already used.");
            }
            if (!IsUsernameValid(model.UserName))
            {
                throw new UserException(400, "Please enter a valid username");
            }
            if (string.IsNullOrEmpty(model.Email))
            {
                throw new UserException(400, "Email is requiered.");
            }
            if (!IsEmailValid(model.Email))
            {
                throw new UserException(400, "Please enter a valid email format.");
            }
            if (IsEmailUsed(model.Email))
            {
                throw new UserException(400, "Email is already used.");
            }
            if (string.IsNullOrEmpty(model.Password))
            {
                throw new UserException(400, "Password cannot be empty");
            }
            if (model.Password != model.ConfirmPassword)
            {
                throw new UserException(400, "Passwords do not match");
            }
            if (!IsPasswordValid(model.Password))
            {
                throw new UserException(400, "Please enter a valid password format");
            }
        }
    }
}
