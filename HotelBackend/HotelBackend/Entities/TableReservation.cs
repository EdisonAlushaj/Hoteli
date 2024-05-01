using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HotelBackend.Entities
{
    public class TableReservation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Full name is required")]
        public string FullName { get; set; }

        // Foreign key referencing the User entity based on FullName
        [ForeignKey("FullName")]
        public User User { get; set; }

        [Required(ErrorMessage = "Reservation date and time are required")]
        public DateTime ReservationDateTime { get; set; }

        [Required(ErrorMessage = "Maximum number of guests is required")]
        public int MaxGuests { get; set; }

        [ForeignKey("MaxGuests")]
   

        [MaxLength(500, ErrorMessage = "Special requests cannot exceed 500 characters")]
        public string SpecialRequests { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        
       public int Establishment { get; set; }

        [ForeignKey("Establishment")]
        public Table Table { get; set; }
    }
}
