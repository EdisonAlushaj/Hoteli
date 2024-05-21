using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HotelBackend.Entities
{
    public class SaunaReservation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReservationId { get; set; }

        public int UserId { get; set; }
        public Userr Userr { get; set; }
        public int SaunaId { get; set; }
        public Sauna Sauna { get; set; }
        public DateTime ReservationDate { get; set; }
    }
}
