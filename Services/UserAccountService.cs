﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using PicturesAPI.Entities;
using PicturesAPI.Exceptions;
using PicturesAPI.Models;
using PicturesAPI.Models.Dtos;
using PicturesAPI.Repos.Interfaces;
using PicturesAPI.Services.Interfaces;

namespace PicturesAPI.Services;

public class UserAccountService : IUserAccountService
{
    private readonly IPasswordHasher<Account> _passwordHasher;
    private readonly AuthenticationSettings _authenticationSettings;
    private readonly IAccountRepo _accountRepo;
    private readonly IMapper _mapper;

    public UserAccountService(
        IPasswordHasher<Account> passwordHasher, 
        AuthenticationSettings authenticationSettings,
        IAccountRepo accountRepo,
        IMapper mapper)
    {
        _passwordHasher = passwordHasher;
        _authenticationSettings = authenticationSettings;
        _accountRepo = accountRepo;
        _mapper = mapper;
    }
        
    public Guid Create(CreateAccountDto dto)
    {
        var newAccount = new Account()
        {
            Nickname = dto.Nickname,
            Email = dto.Email,
            RoleId = dto.RoleId
        };

        var hashedPassword = _passwordHasher.HashPassword(newAccount, dto.Password);
        newAccount.PasswordHash = hashedPassword;
        
        var newAccountId = _accountRepo.CreateAccount(newAccount);
        return newAccountId;
    }

    public LoginSuccessResult GenerateJwt(LoginDto dto)
    {
        var account = _accountRepo.GetAccountByNick(dto.Nickname);
        if (account is null || account.IsDeleted)
            throw new BadRequestException("Invalid nickname or password");

        var result = _passwordHasher.VerifyHashedPassword(account, account.PasswordHash, dto.Password);
        if (result == PasswordVerificationResult.Failed)
            throw new BadRequestException("Invalid nickname or password");

        var claims = new List<Claim>()
        {
            new Claim(ClaimTypes.NameIdentifier, (account.Id.ToString())),
            new Claim(ClaimTypes.Name, account.Nickname),
            new Claim(ClaimTypes.Role, account.RoleId.ToString()),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);

        var token = new JwtSecurityToken(
            _authenticationSettings.JwtIssuer,
            _authenticationSettings.JwtIssuer,
            claims,
            expires: expires,
            signingCredentials: cred);

        var tokenHandler = new JwtSecurityTokenHandler();

        var loginSuccessResult = new LoginSuccessResult()
        {
            AccountDto = _mapper.Map<Account, AccountDto>(account),
            AuthToken = tokenHandler.WriteToken(token)
        };
        
        return loginSuccessResult;

    }
}