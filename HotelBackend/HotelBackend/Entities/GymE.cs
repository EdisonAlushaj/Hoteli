namespace HotelBackend.Entities
{
    public class GymE
    {
        public int Id { get; set; }
        public required string GymEqName { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int GymId { get; set; }
    }
}
