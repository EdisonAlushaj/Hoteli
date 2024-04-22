namespace HotelBackend.Entities
{
    public class Room
    {
        public int Id { get; set; }
        public required string RoomName { get; set; } 
        public string Capacity { get; set; } = string.Empty;
        public double Size { get; set; }
        public string Description { get; set; } = string.Empty;
        public required double Price { get; set; }
        public string Image { get; set; } = string.Empty;
    }
}
