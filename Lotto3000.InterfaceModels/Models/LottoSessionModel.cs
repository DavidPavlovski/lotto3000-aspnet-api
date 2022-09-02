namespace Lotto3000.InterfaceModels.Models
{
    public class LottoSessionModel
    {
        public int Id { get; set; }
        public List<int> WinningNumbers { get; set; }
        public DateTime DrawDate { get; set; }
    }
}
