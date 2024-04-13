namespace HotelBackend.Entities
{
    public class MenuCafe
    {
        public int Id { get; set; }
        public required string CafeName { get; set; }
        public string CafeDescription { get; set; } = string.Empty;
        public double CafePrice { get; set; }
        public string CafeImage { get; set; } = string.Empty;
    }
}
