namespace HotelBackend.Entities
{
    public class Fitnes
    {
        public int Id { get; set; }
        public string FitnesName { get; set; }
        public double PriceDaily { get; set; }
        public double PriceMonthly { get; set; }
        public double PriceOffers { get; set; }
        public string Image { get; set; }
        public int HallId { get; set; }
    }
}
