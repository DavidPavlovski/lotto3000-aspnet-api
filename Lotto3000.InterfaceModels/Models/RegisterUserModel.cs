using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lotto3000.InterfaceModels.Models
{
    public class RegisterUserModel
    {
       public string FirstName { get; set; }
       public string LastName { get; set; }
       public string UserName { get; set; }
       public string Email { get; set; }
       public string Password { get; set; }
       public string ConfirmPassword { get; set; }
    }
}
