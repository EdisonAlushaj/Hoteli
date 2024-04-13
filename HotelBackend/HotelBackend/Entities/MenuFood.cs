namespace HotelBackend.Entities
{
    public class MenuFood
    {
        public int Id { get; set; }
        public required string FoodName { get; set; }
        public string FoodDescription { get; set; } = string.Empty;
        public double FoodPrice { get; set; }
        public string FoodImage { get; set; } = string.Empty;
    }
}
