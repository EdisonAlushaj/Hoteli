namespace HotelBackend.Entities
{
    public class Hall
    {
        public int Id { get; set; }
        public required string HallName { get; set; }
        public required int Floor { get; set; }
    }
}
