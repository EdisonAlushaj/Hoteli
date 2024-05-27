using HotelBackend.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using SharedClassLibrary.Contracts;
using SharedClassLibrary.DTOs;
using static SharedClassLibrary.DTOs.ServiceResponses;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;

public class AccountRepository(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration config) : IUserAccount
{
    public async Task<GeneralResponse> CreateAccount(UserDTO userDTO)
    {
        if (userDTO is null) return new GeneralResponse(false, "Model is empty");

        var newUser = new ApplicationUser
        {
            Name = userDTO.Name,
            Email = userDTO.Email,
            PasswordHash = userDTO.Password,
            UserName = userDTO.Name,
        };

        var user = await userManager.FindByEmailAsync(newUser.Email);
        if (user != null) return new GeneralResponse(false, "User already registered");

        var createUserResult = await userManager.CreateAsync(newUser, userDTO.Password);
        if (!createUserResult.Succeeded) return new GeneralResponse(false, "Error occurred.. please try again");

        var isFirstUser = (await userManager.Users.CountAsync()) == 1;
        var roleName = isFirstUser ? "Admin" : "User";

        var roleExists = await roleManager.RoleExistsAsync(roleName);
        if (!roleExists)
        {
            var roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
            if (!roleResult.Succeeded) return new GeneralResponse(false, "Error creating role");
        }

        var addToRoleResult = await userManager.AddToRoleAsync(newUser, roleName);
        if (!addToRoleResult.Succeeded) return new GeneralResponse(false, "Error adding user to role");

        return new GeneralResponse(true, "Account Created");
    }

    public async Task<LoginResponse> LoginAccount(LoginDTO loginDTO)
    {
        if (loginDTO == null)
            return new LoginResponse(false, null, "Login container is empty");

        var getUser = await userManager.FindByEmailAsync(loginDTO.Email);
        if (getUser == null)
            return new LoginResponse(false, null, "User not found");

        if (string.IsNullOrEmpty(getUser.Email) || string.IsNullOrEmpty(getUser.UserName))
            return new LoginResponse(false, null, "User data is incomplete");

        bool checkUserPasswords = await userManager.CheckPasswordAsync(getUser, loginDTO.Password);
        if (!checkUserPasswords)
            return new LoginResponse(false, null, "Invalid email/password");

        var getUserRole = await userManager.GetRolesAsync(getUser);
        if (getUserRole == null || !getUserRole.Any())
            return new LoginResponse(false, null, "User has no assigned roles");

        var userSession = new UserSession(getUser.Id, getUser.UserName, getUser.Email, getUserRole.First());
        string token = GenerateToken(userSession);
        return new LoginResponse(true, token, "Login completed");
    }

    private string GenerateToken(UserSession user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        var userClaims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        };
        var token = new JwtSecurityToken(
            issuer: config["Jwt:Issuer"],
            audience: config["Jwt:Audience"],
            claims: userClaims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: credentials
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
