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
