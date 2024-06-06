using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelBackend.Entities
{
    public class RoomBooking
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RoomBookingId { get; set; }
        [Required]
        public string Id { get; set; }
        public Data.ApplicationUser User { get; set; }

        [Required]
        public string PaymentMethod { get; set; }

        [Required]
        public DateTime CheckInDate { get; set; }

        [Required]
        public DateTime CheckOutDate { get; set; }

        public List<RoomBookingItem> RoomBookingItems { get; set; } = new List<RoomBookingItem>();

        [NotMapped]
        public double TotalBookingPrice { get; private set; }

        // Method to calculate total order price
        public void CalculateTotalBookingPrice()
        {
            TotalBookingPrice = 0;
            foreach (var item in RoomBookingItems)
            {
                TotalBookingPrice += item.Price * item.Quantity;
            }
        }
    }
}
