using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HotelBackend.Entities
{
    public class Roli
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RoleId { get; set; }

        [Required(ErrorMessage = "Role name is required")]
        public string RoleName { get; set; }

        [Required(ErrorMessage = "Contract type is required")]
        public string RoleContractType { get; set; }

        [Required(ErrorMessage = "Salary/Compensation is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Salary must be a positive value")]
        public decimal RoleSalary { get; set; }

        [Required(ErrorMessage = "Department/Division is required")]
        public string RoleDepartment { get; set; }

        public bool RoleUniformRequirements { get; set; }

        public string RoleLanguageSkills { get; set; }

        [Required(ErrorMessage = "Start date is required")]
        public DateTime RoleStartDate { get; set; }

        public DateTime? RoleEndDate { get; set; }

        //public List<UsersRoles> UserRoles { get; set; }
    }
}
