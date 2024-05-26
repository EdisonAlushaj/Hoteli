using Microsoft.AspNetCore.Identity;

namespace HotelBackend.Data
{
    public class AplicationUser :IdentityUser
    {
        public string? Name { get; set; }

    }
}
