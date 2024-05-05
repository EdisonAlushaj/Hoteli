using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelBackend.Entities
{
    public class Pool
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Duration { get; set; }
        public string PoolArea { get; set; }
        public int NumberofGuests { get; set; }
        public int HallId { get; set; }

    }
}
