using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lotto3000.Exceptions
{
    public class LottoSessionException : Exception
    {
        public int? LottoSessionId { get; set; }
        public int StatusCode { get; set; }

        public LottoSessionException(int statusCode, string message) : base(message)
        {
            StatusCode = statusCode;
        }

        public LottoSessionException(int statusCode, int? lottoSessionId, string message) : base(message)
        {
            LottoSessionId = lottoSessionId;
            StatusCode = statusCode;
        }
    }
}
