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
        public int TableReservationId { get; set; }

        [Required(ErrorMessage = "Full name is required")]
        
        public int UserId { get; set; }

        public Userr User { get; set; }

        [Required(ErrorMessage = "Reservation date is required")]
        [DataType(DataType.Date)]
        public DateTime ReservationDate { get; set; }

        [Required(ErrorMessage = "Reservation time is required")]
        [DataType(DataType.Time)]
        public TimeSpan ReservationTime { get; set; }

        [Required(ErrorMessage = "Maximum number of guests is required")]
        public int MaxGuests { get; set; }


        [MaxLength(500, ErrorMessage = "Special requests cannot exceed 500 characters")]
        public string SpecialRequests { get; set; }
       [JsonConverter(typeof(JsonStringEnumConverter))]
       public EstablishmentType Establishment { get; set; }

        public int Id { get; set; }
        public Table Table { get; set; }
    }
}