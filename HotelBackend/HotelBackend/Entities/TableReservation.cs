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
        public int ReservationId { get; set; }
        public int UserId { get; set; }
        public Userr User { get; set; }
        public int Id { get; set; }
        public Table Table { get; set; }
        public DateTime ReservationDate { get; set; }
        public int MaxGuests { get; set; }

        [MaxLength(500, ErrorMessage = "Special requests cannot exceed 500 characters")]
        public string SpecialRequests { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public EstablishmentType Establishment { get; set; }
    
    }
}