namespace HotelBackend.Entities
{
    public class Gym
    {
        public int Id { get; set; }
        public string GymName { get; set; }
        public double PriceDaily { get; set; }
        public double PriceMonthly { get; set; }
        public double PriceOffers { get; set; }
        public string Image { get; set; }
    }
}
