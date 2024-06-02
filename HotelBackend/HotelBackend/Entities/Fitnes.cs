namespace HotelBackend.Entities
{
    public class Fitnes
    {
        public int Id { get; set; }
        public string FitnesName { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }
        public int HallId { get; set; }
    }
}