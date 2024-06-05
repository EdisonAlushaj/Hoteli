using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HotelBackend.Entities
{
    public class OrderDrinkItem
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderDrinkItemId { get; set; }

        [Required]
        public int OrderDrinkId { get; set; }

        [ForeignKey("OrderDrinkId")]
        public OrderDrink OrderDrink { get; set; }

        [Required]
        public int MenuDrinkId { get; set; }

        [ForeignKey("MenuDrinkId")]
        public MenuDrink MenuDrink { get; set; }

        [Required]
        public string DrinkkName { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public int Quantity { get; set; }

    }
}
