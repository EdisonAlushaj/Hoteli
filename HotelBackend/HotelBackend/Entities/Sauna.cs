using System.Reflection.Metadata;

namespace HotelBackend.Entities
{
    public class Sauna
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Cost {  get; set; }
        public string Description { get; set; }
        public string image { get; set; }
        public int HallId { get; set; }
        public int Duration { get; set; }

    }
}
