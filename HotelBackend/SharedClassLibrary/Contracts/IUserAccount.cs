using SharedClassLibrary.DTOs;
using static SharedClassLibrary.DTOs.ServiceResponses;

namespace SharedClassLibrary.Contracts
{
    public interface IUserAccount
    {
        Task<GeneralResponse> CreateAccount(UserDTO userDTO);  // Correct method name
        Task<LoginResponse> LoginAccount(LoginDTO loginDTO);
        Task<List<UserDetailsDTO>> GetUsers();
    }
}
