using System.ComponentModel.DataAnnotations;

namespace HotelBackend.Entities
{
    public class ActivitiesReservation
    {
        [Key]
        public int ReservationId { get; set; }
        public string UserId { get; set; }
        public Data.ApplicationUser User { get; set; }
        public int ActivitiesId { get; set; }
        public Activities Activities { get; set; }
    }
}
