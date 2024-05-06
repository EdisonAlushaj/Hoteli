namespace HotelBackend.Entities
{
    public class FitnesEquipmet
    {
        public int Id { get; set; }
        public required string GymEqName { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int FitnesId { get; set;}
    }
}
