using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelBackend.Entities
{    public class Role
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Role name is required")]
        public string Name { get; set; }

        public string Address { get; set; }

        [Required(ErrorMessage = "Contract type is required")]
        public string ContractType { get; set; }

        [Required(ErrorMessage = "Salary/Compensation is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Salary must be a positive value")]
        public decimal Salary { get; set; }

        [Required(ErrorMessage = "Department/Division is required")]
        public string Department { get; set; }

        public string UniformRequirements { get; set; }

        public bool EmergencyProceduresTraining { get; set; }

        public string LanguageSkills { get; set; }

        [Required(ErrorMessage = "Start date is required")]
        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }
    }
}