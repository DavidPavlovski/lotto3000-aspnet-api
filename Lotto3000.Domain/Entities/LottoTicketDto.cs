namespace Lotto3000.Domain.Entities
{
    public class LottoTicketDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public UserDto User { get; set; }
        public string Combination { get; set; }
        public DateTime Created { get; set; }
        public int? LottoSessionId { get; set; }
        public LottoSessionDto? LottoSession { get; set; }

        public LottoTicketDto() { }
        public LottoTicketDto(int userId, string combination)
        {
            UserId = userId;
            Combination = combination;
            Created = DateTime.Now;
            LottoSessionId = null;
        }
    }
}
