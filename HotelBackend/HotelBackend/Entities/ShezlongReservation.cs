using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HotelBackend.Entities
{
    public class ShezlongReservation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReservationId { get; set; }

        public int UserId { get; set; }
        public Userr Userr { get; set; }
        // Foreign key to reference the user
        public int ShezlongId { get; set; } // Foreign key to reference the shezlong
        public Shezlong Shezlong { get; set; }
        public DateTime ReservationDate { get; set; }
        // You can add more properties like reservation status, duration, etc.
    }
}
