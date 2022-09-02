namespace Lotto3000.Domain.Entities
{
    public class LottoSessionDto
    {
        public int Id { get; set; }
        public string WinningNumbers { get; set; }
        public DateTime DrawDate { get; set; }
        public LottoSessionDto() { }
        public LottoSessionDto(string winningNumbers)
        {
            WinningNumbers = winningNumbers;
            DrawDate = DateTime.Now;
        }
    }
}