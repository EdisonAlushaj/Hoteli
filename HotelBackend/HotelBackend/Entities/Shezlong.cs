using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelBackend.Entities
{
    public class Shezlong
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        // Foreign key to reference the Pool
        [ForeignKey("Pool")]
        public int PoolId { get; set; }

        // Navigation property for the Pool this Shezlong belongs to
        public Pool Pool { get; set; }
    }
}
