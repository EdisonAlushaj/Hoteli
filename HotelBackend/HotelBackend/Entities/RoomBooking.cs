namespace HotelBackend.Entities
{
    public class RoomBooking
    {
        public int RoomBookingId { get; set; }
        public required bool Availability { get; set; }
        public DateTime DataEBooking { get; set; }
        public int RoomId { get; set; }
        public Room Room { get; set; }

    }
}