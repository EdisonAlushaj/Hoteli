using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HotelBackend.Entities
{
    public class Table
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Table number is required")]
        public int TableNumber { get; set; }

        [Required(ErrorMessage = "Maximum number of guests is required")]
        public int MaxGuests { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public EstablishmentType Establishment { get; set; }

        public string GetEstablishmentString()
        {
            switch (Establishment)
            {
                case EstablishmentType.Restaurant:
                    return "Restaurant";
                case EstablishmentType.Bar:
                    return "Bar";
                case EstablishmentType.Cafe:
                    return "Cafe";
                default:
                    throw new ArgumentOutOfRangeException(nameof(Establishment), Establishment, "Invalid establishment type");
            }
        }
    }

    public enum EstablishmentType
    {
        Restaurant,
        Bar,
        Cafe
    }
}
