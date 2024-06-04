using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HotelBackend.Entities
{
    public class OrderCoffeeItem
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderCoffeeItemId { get; set; }

        [Required]
        public int OrderCoffeeId { get; set; }

        [ForeignKey("OrderCoffeeId")]
        public OrderCoffee OrderCoffee { get; set; }

        [Required]
        public int MenuCoffeeId { get; set; }

        [ForeignKey("MenuCoffeeId")]
        public MenuCafe MenuCoffee { get; set; }

        [Required]
        public string CafeName { get; set; }
        [Required]
        public double Price { get; set; }

        [Required]
        public int Quantity { get; set; }

    }
}
