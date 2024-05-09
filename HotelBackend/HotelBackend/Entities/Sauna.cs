using System.Reflection.Metadata;

namespace HotelBackend.Entities
{
    public class Sauna
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte[] image { get; set; }
        public int HallId { get; set; }
    }
}
