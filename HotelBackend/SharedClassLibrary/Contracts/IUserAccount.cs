using SharedClassLibrary.DTOs;
using static SharedClassLibrary.DTOs.ServiceResponses;

namespace SharedClassLibrary.Contracts
{
    public interface IUserAccount
    {
        Task<GeneralResponse> CreateAccount(UserDTO userDTO);  // Correct method name
        Task<ServiceResponses.LoginResponse> LoginAccount(LoginDTO loginDTO);
    }
}
