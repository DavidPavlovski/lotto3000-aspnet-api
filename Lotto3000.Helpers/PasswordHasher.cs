using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace Lotto3000.Helpers
{
    public static class PasswordHasher
    {
        public static string HashPassword(string input)
        {
            var md5 = new MD5CryptoServiceProvider();
            var md5Data = md5.ComputeHash(Encoding.ASCII.GetBytes(input));
            var hashedPassword = Encoding.ASCII.GetString(md5Data);
            return hashedPassword;
        }
    }
}
