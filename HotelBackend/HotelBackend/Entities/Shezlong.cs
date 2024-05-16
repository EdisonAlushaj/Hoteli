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
       
        public int PoolId { get; set; }

       
    }
}
