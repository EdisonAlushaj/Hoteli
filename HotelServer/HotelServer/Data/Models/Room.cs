namespace HotelServer.Data.Models
{
    public class Room
    {
        public int RoomID { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public int Size { get; set; }
        public string Description { get; set; }
        public string Imgae { get; set; }
        public double Price { get; set; }
    }
}
