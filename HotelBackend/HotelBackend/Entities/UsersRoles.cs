using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HotelBackend.Entities
{
    public class UsersRoles
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UsersRolesId { get; set; }

        public int UsersId { get; set; }
        public Userr Userr { get; set; }

        public int RolesId { get; set; }
        public Roli Roles { get; set; }
    }

}
