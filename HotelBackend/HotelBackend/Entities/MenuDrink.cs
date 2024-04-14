namespace HotelBackend.Entities
{
    public class MenuDrink
    {
        public int Id { get; set; }
        public required string DrinkName { get; set; }
        public string DrinkDescription { get; set; } = string.Empty;
        public double DrinkPrice { get; set; }
        public string DrinkImage { get; set; } = string.Empty;
    }
}
