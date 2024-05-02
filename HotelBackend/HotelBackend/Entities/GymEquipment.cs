namespace HotelBackend.Entities
{
    public class GymEquipment
    {
        public int Id { get; set; }
        public required string GymEqName { get; set; }
        public string Description { get; set; }
        public Boolean Works { get; set; }
        public string Image { get; set; }
    }
}
