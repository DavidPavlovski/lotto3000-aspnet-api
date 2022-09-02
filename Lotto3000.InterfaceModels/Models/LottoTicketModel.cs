using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lotto3000.InterfaceModels.Models
{
    public class LottoTicketModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public UserModel? User { get; set; }
        public List<int> Combination { get; set; }
        public DateTime Created { get; set; }
        public int? LottoSessionId { get; set; }
        public LottoSessionModel? LottoSession { get; set; }
        public int GuessedNumbers { get; set; } = 0;
    }
}
