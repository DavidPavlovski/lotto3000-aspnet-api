namespace Lotto3000.Helpers
{
    public static class TicketConverter
    {

        public static string ListToString(this List<int> combination)
        {
            return string.Join(",", combination.ToArray());
        }

        public static List<int> StringToList(this string combination)
        {
            return combination.Split(",").Select(x => int.Parse(x)).ToList();
        }
    }
}