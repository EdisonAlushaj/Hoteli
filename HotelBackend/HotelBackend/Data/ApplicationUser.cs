using Microsoft.AspNetCore.Identity;

namespace HotelBackend.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }  // Add this property
    }
}
