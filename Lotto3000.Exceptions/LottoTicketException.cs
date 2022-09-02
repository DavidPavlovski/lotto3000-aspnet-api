using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lotto3000.Exceptions
{
    public class LottoTicketException : Exception
    {
        public int? TicketId { get; set; }
        public int StatusCode { get; set; }

        public LottoTicketException(int statusCode, string message) : base(message)
        {
            StatusCode = statusCode;
        }

        public LottoTicketException(int statusCode, int? ticketId, string message) : base(message)
        {
            TicketId = ticketId;
            StatusCode = statusCode;
        }
    }
}
