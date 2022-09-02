using Lotto3000.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lotto3000.DataAccess
{
    public static class StaticDb
    {

        public static int UserIdCounter = 1;
        public static int LottoSessionCounter = 1;
        public static int LottoTicketCounter = 1;

        public static List<UserDto> Users = new List<UserDto>();
        public static List<LottoSessionDto> LottoSessions = new List<LottoSessionDto>();
        public static List<LottoTicketDto> LottoTickets = new List<LottoTicketDto>();
    }
}
