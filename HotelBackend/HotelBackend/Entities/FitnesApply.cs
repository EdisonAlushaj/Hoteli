using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HotelBackend.Entities
{
    public class FitnesApply
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReservationId { get; set; }

        public string Id { get; set; }
        public Data.ApplicationUser Userr { get; set; }
        public int FitnesId { get; set; }
        public Fitnes Fitnes { get; set; }
    }
}