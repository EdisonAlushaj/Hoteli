using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HotelBackend.Entities
{
    public class OrderDrink
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderDrinkId { get; set; }
        public string Id { get; set; }
        public Data.ApplicationUser User { get; set; }

        [Required]
        public string DeliveryLocation { get; set; }

        [Required]
        public string DeliveryNumber { get; set; }

        [Required]
        public string PaymentMethod { get; set; }

        public List<OrderDrinkItem> OrderDrinkItems { get; set; } = new List<OrderDrinkItem>();

        [NotMapped]
        public double TotalOrderDrinkPrice { get; private set; }

        // Method to calculate total order price
        public void CalculateTotalOrderDrinkPrice()
        {
            TotalOrderDrinkPrice = 0;
            foreach (var item in OrderDrinkItems)
            {
                TotalOrderDrinkPrice += item.Price;
            }
        }
    }
}