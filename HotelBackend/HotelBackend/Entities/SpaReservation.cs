using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HotelBackend.Entities
{
    public class SpaReservation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReservationId { get; set; }

        public int UserId { get; set; }
        public Userr Userr { get; set; }
        public int SpaId { get; set; } 
        public Spa Spa { get; set; }
        public DateTime ReservationDate { get; set; }
    }
}
