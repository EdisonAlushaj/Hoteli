using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HotelBackend.Entities
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public Userr User { get; set; }

        [Required]
        public string DeliveryLocation { get; set; }

        [Required]
        public string DeliveryNumber { get; set; }

        [Required]
        public string PaymentMethod { get; set; }

        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

        [NotMapped]
        public double TotalOrderPrice { get;  set; }
    
        // Method to calculate total order price
        public void CalculateTotalOrderPrice()
        {
            TotalOrderPrice = 0;
            foreach (var item in OrderItems)
            {
                TotalOrderPrice += item.Price;
            }
        }
    }
}

