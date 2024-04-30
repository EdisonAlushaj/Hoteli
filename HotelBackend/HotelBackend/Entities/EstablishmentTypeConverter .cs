using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace HotelBackend.Entities
{
    public class EstablishmentTypeConverter : JsonConverter<EstablishmentType>
    {
        public override EstablishmentType Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            // Implement if needed (not needed for now)
            throw new NotImplementedException();
        }

        public override void Write(Utf8JsonWriter writer, EstablishmentType value, JsonSerializerOptions options)
        {
            // Convert the enum value to its string representation
            string establishmentString = value.ToString();
            writer.WriteStringValue(establishmentString);
        }
    }
}
