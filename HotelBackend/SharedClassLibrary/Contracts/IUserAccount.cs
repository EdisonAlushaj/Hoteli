using SharedClassLibrary.DTOs;

namespace SharedClassLibrary.Contracts
{
    public interface IUserAccount
    {
        Task<ServiceResponses.GeneralResponse> CreateAccount(UserDTO userDTO);
        Task<ServiceResponses.LoginResponse> LoginAccount(LoginDTO loginDTO);
        Task<List<UserDetailsDTO>> GetUsers();
        Task<ServiceResponses.GeneralResponse> UpdateUser(string id, UserDetailsDTO userDetailsDTO);
    }
}
