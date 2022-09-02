using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lotto3000.Exceptions
{
    public class UserException : Exception
    {
        public int? UserId { get; set; }
        public int StatusCode { get; set; }

        public UserException(int statusCode, string message) : base(message)
        {
            StatusCode = statusCode;
        }
        public UserException(int statusCode, int? userId, string message) : base(message)
        {
            UserId = userId;
            StatusCode = statusCode;
        }
    }
}
