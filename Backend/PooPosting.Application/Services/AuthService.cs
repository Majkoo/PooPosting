using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing.Matching;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PooPosting.Application.Models.Configuration;
using PooPosting.Application.Models.Dtos.Auth.In;
using PooPosting.Application.Models.Dtos.Auth.Out;
using PooPosting.Application.Services.Helpers;
using PooPosting.Domain.DbContext;
using PooPosting.Domain.DbContext.Entities;
using PooPosting.Domain.Exceptions;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;

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
        var account = await dbContext.Accounts
            .FirstOrDefaultAsync(a => a.Nickname == dto.Nickname || a.Email == dto.Nickname);

        if (account is null)
            throw new UnauthorizedException("Wrong password, please try again");

        var result = passwordHasher.VerifyHashedPassword(account, account.PasswordHash, dto.Password);
        if (result == PasswordVerificationResult.Failed) throw new UnauthorizedException("Wrong password, please try again");

        return await GenerateAuthResult(account);
    }

    public async Task<AuthSuccessResult> GoogleLogin(GoogleLoginDto dto)
    {
        GoogleJsonWebSignature.Payload payload;
        try
        {
            payload = await GoogleJsonWebSignature.ValidateAsync(dto.IdToken);
        }
        catch (Exception)
        {
            throw new UnauthorizedException("Invalid Google token");
        }

        var user = await dbContext.Accounts
                .FirstOrDefaultAsync(u => u.GoogleId == payload.Subject);

        if (user == null)
        {
            var existingEmail = dbContext.Accounts.FirstOrDefault(x => x.Email == dto.Email);
            if (existingEmail != null)
            {
                throw new BadRequestException($"That email already exists");
            }

            var maxNicknameLenght = Account.MaxNicknameLength;
            var nickname = dto.Name.Substring(0, Math.Min(dto.Name.Length, maxNicknameLenght));
            var shorterNickname = dto.Name.Substring(0, Math.Min(dto.Name.Length, maxNicknameLenght - 4)); // this gives us room to generate different username

            var existingNicknames = dbContext.Accounts
                .Where(x => x.Nickname.StartsWith(shorterNickname))
                .Select(a => a.Nickname)
                .ToList();

            var testNickname = nickname;
            while (existingNicknames.Contains(testNickname))
            {
                var randomSuffix = new Random().Next(100, 9999).ToString();
                testNickname = shorterNickname + randomSuffix;
            }
    
            user = new Account()
            {
                Nickname = testNickname,
                Email = dto.Email,
                Provider = "Google",
                ProfilePicUrl = dto.PhotoUrl,
                GoogleId = payload.Subject,
                PasswordHash = "GoogleHash"
            };
            dbContext.Accounts.Add(user);
            await dbContext.SaveChangesAsync();
        }

        return await GenerateAuthResult(user);
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