using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HotelBackend.Entities
{
    public class OrderCoffee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderCoffeeId { get; set; }
        public string Id { get; set; }
        public Data.ApplicationUser User { get; set; }

        [Required]
        public string DeliveryLocation { get; set; }

        [Required]
        public string DeliveryNumber { get; set; }

        [Required]
        public string PaymentMethod { get; set; }

        public List<OrderCoffeeItem> OrderCoffeeItems { get; set; } = new List<OrderCoffeeItem>();

        [NotMapped]
        public double TotalOrderCoffeePrice { get; private set; }

        // Method to calculate total order price
        public void CalculateTotalOrderCoffeePrice()
        {
            TotalOrderCoffeePrice = 0;
            foreach (var item in OrderCoffeeItems)
            {
                TotalOrderCoffeePrice += item.Price;
            }
        }
    }
}