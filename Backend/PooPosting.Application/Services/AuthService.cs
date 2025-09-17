using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PooPosting.Application.Models.Configuration;
using PooPosting.Application.Models.Dtos.Auth.In;
using PooPosting.Application.Models.Dtos.Auth.Out;
using PooPosting.Application.Services.Helpers;
using PooPosting.Domain.DbContext;
using PooPosting.Domain.DbContext.Entities;
using PooPosting.Domain.Exceptions;

namespace PooPosting.Application.Services;

public class AuthService(
        IPasswordHasher<Account> passwordHasher,
        AuthenticationSettings authenticationSettings,
        PictureDbContext dbContext
        )
{
    public async Task<string> RegisterAccount(RegisterDto dto)
    {
        var newAccount = new Account()
        {
            Nickname = dto.Nickname,
            Email = dto.Email
        };
        
        var hashedPassword = passwordHasher.HashPassword(newAccount, dto.Password);
        newAccount.PasswordHash = hashedPassword;
        
        newAccount.ProfilePicUrl =
            Path.Combine("wwwroot", "accounts", "profile_pictures", $"default{new Random().Next(0, 5)}-pfp.webp");
        
        var account = await dbContext.Accounts.AddAsync(newAccount);
        await dbContext.SaveChangesAsync();
        return IdHasher.EncodeAccountId(account.Entity.Id);
    }

    public async Task<AuthSuccessResult> GenerateJwt(LoginDto dto)
    {
        var account = await dbContext.Accounts.FirstOrDefaultAsync(a => a.Nickname == dto.Nickname);
        if (account is null) throw new UnauthorizedException("Invalid nickname or password");
        
        var result = passwordHasher.VerifyHashedPassword(account, account.PasswordHash, dto.Password);
        if (result == PasswordVerificationResult.Failed) throw new UnauthorizedException("Invalid nickname or password");

        return await GenerateAuthResult(account);
    }
    
    public async Task<AuthSuccessResult> GenerateJwt(RefreshSessionDto dto)
    {
        var account = await dbContext.Accounts.FirstOrDefaultAsync(a => a.Id == IdHasher.DecodeAccountId(dto.Uid));
        
        if (account is null) throw new NotFoundException();
        if (account.RefreshToken != dto.RefreshToken) throw new UnauthorizedException("Refresh token invalid");
        if (account.RefreshTokenExpires > DateTime.UtcNow) throw new UnauthorizedException("Refresh token invalid");

        return await GenerateAuthResult(account);
    }
    
    public async Task Forget(ForgetSessionDto dto)
    {
        var account = await dbContext.Accounts.FirstOrDefaultAsync(a => a.Id == IdHasher.DecodeAccountId(dto.Uid));
        
        if (account is null) throw new NotFoundException();
        if (account.RefreshToken != dto.RefreshToken) throw new UnauthorizedException("Refresh token invalid");
        
        if (account.RefreshTokenExpires < DateTime.UtcNow)
        {
            account.RefreshToken = null;
            account.RefreshTokenExpires = null;
            await dbContext.SaveChangesAsync();
        }
    }

    private async Task<AuthSuccessResult> GenerateAuthResult(Account account)
    {
        var claims = new List<Claim>()
        {
            new Claim(ClaimTypes.NameIdentifier, (account.Id.ToString())),
            new Claim(ClaimTypes.Name, account.Nickname),
            new Claim(ClaimTypes.Role, account.RoleId.ToString()),
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.JwtKey));
        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.UtcNow.AddDays(authenticationSettings.JwtExpireDays);
        var token = new JwtSecurityToken(
            authenticationSettings.JwtIssuer,
            authenticationSettings.JwtIssuer,
            claims,
            expires: expires,
            signingCredentials: cred);
        

        var refreshToken = Guid.NewGuid().ToString("N") + Guid.NewGuid().ToString("N");

        account.RefreshToken = refreshToken;
        account.RefreshTokenExpires = DateTime.UtcNow.AddDays(authenticationSettings.RefreshTokenExpireDays);

        await dbContext.SaveChangesAsync();
            
        var tokenHandler = new JwtSecurityTokenHandler();
        var authSuccessResult = new AuthSuccessResult()
        {
            AuthToken = tokenHandler.WriteToken(token),
            Uid = IdHasher.EncodeAccountId(account.Id),
            RoleId = account.RoleId,
            RefreshToken = refreshToken
        };
        
        return authSuccessResult;
    }
}