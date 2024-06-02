using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HotelBackend.Entities
{
    public class ShezlongReservation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReservationId { get; set; }

        public string Id { get; set; }
        public Data.ApplicationUser Userr { get; set; }
        public int ShezlongId { get; set; }
        public Shezlong Shezlong { get; set; }
        public DateTime ReservationDate { get; set; }
    }
}
