using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PooPosting.Application.Authorization;
using PooPosting.Application.Mappers;
using PooPosting.Application.Models.Dtos.Account.In;
using PooPosting.Application.Models.Dtos.Account.Out;
using PooPosting.Application.Models.Queries;
using PooPosting.Application.Services.Helpers;
using PooPosting.Domain.DbContext;
using PooPosting.Domain.DbContext.Entities;
using PooPosting.Domain.DbContext.Pagination;
using PooPosting.Domain.Enums;
using PooPosting.Domain.Exceptions;
using System.Formats.Tar;
using System.Linq.Expressions;

namespace PooPosting.Application.Services;

public class AccountService(
        PictureDbContext dbContext,
        AccountContextService accountContextService,
        IAuthorizationService authorizationService,
        IPasswordHasher<Account> passwordHasher
        )
{
    public async Task<AccountDto> GetById(int id)
    {
        return await dbContext.Accounts
            .Where(a => a.Id == id)
            .ProjectToDto()
            .FirstOrDefaultAsync() ?? throw new NotFoundException();
    }

    public async Task<AccountDto> GetCurrent()
    {
        var accId = accountContextService.GetAccountId();
        return await dbContext.Accounts
            .Where(a => a.Id == accId)
            .ProjectToDto()
            .FirstOrDefaultAsync() ?? throw new NotFoundException();
    }

    private static Expression<Func<Account, object>> GetOrderBy(string? orderBy) =>
    orderBy?.ToLower() switch
    {
        "nickname" => a => a.Nickname,
        "email" => a => a.Email,
        "roleid" => a => a.RoleId,
        "accountcreated" => a => a.AccountCreated,
        _ => a => a.Id
    };


    public async Task<PagedResult<AccountDto>> GetAll(AccountQueryParams queryParams)
    {
        return await dbContext.Accounts.GetPageAsync<Account, AccountDto>(
            queryParams,
            filter: string.IsNullOrWhiteSpace(queryParams.SearchPhrase)
                ? null
                : q => q.Where(a => a.Nickname.Contains(queryParams.SearchPhrase)),
            orderBy: q => queryParams.Direction == "asc" ? q.OrderBy(GetOrderBy(queryParams.OrderBy)) : q.OrderByDescending(GetOrderBy(queryParams.OrderBy)),
            projector: q => q.ProjectToDto(),
            asNoTracking: true,
            asSplitQuery: true
        );
    }


    public async Task<List<String>> ChangeSetTags(List<String> tags)
    {
        var accountId = accountContextService.GetAccountId();

        var existing = await dbContext.AccountsSetTags.FirstOrDefaultAsync(x => x.AccountId == accountId);

        if (existing is null)
        {
            existing = new AccountsSetTags
            {
                AccountId = accountId,
                Tags = tags
            };
            await dbContext.AccountsSetTags.AddAsync(existing);
        }
        else
        {
            existing.Tags = tags;
            dbContext.AccountsSetTags.Update(existing);
        }

        await dbContext.SaveChangesAsync();

        return tags;
    }

    public async Task<List<String>> GetSetTags()
    {
        var accountId = accountContextService.GetAccountId();

        var tags = await dbContext.AccountsSetTags.FirstOrDefaultAsync(x => x.AccountId == accountId);

        return tags?.Tags ?? new List<string>();
    }

    public async Task<AccountDto> UpdateEmail(UpdateAccountEmailDto dto)
    {
        var account = await accountContextService.GetAccountAsync();
        account.Email = dto.Email;
        dbContext.Update(account);
        await dbContext.SaveChangesAsync();
        return account.MapToDto();
    }

    public async Task<AccountDto> UpdatePassword(UpdateAccountPasswordDto dto)
    {
        var account = await accountContextService.GetAccountAsync();
        account.PasswordHash = passwordHasher.HashPassword(account, dto.Password);
        dbContext.Update(account);
        await dbContext.SaveChangesAsync();
        return account.MapToDto();
    }

    public Task<AccountDto> UpdateBackgroundPicture(UpdateAccountPictureDto dto)
    {
        // var account = await accountContextService.GetAccountAsync();
        // if (dto.File != null && !dto.File.ContentType.StartsWith("image")) throw new BadRequestException("invalid picture");
        // var fileExt = dto.File != null && dto.File.ContentType.EndsWith("gif") ? "gif" : "webp";
        // var bgName = $"{IdHasher.EncodeAccountId(account.Id)}-{DateTime.UtcNow.ToFileTimeUtc()}-bgp.{fileExt}";
        // var result = dbContext.Update(account).Entity.MapToDto(account.Id);
        // await dbContext.SaveChangesAsync();
        // return result;
        throw new NotImplementedException();
    }

    public async Task<AccountDto> UpdateProfilePicture(UpdateAccountPictureDto dto)
    {
        var account = await accountContextService.GetAccountAsync();
        if (dto.File != null && !dto.File.ContentType.StartsWith("image")) throw new BadRequestException("invalid picture");
        var fileExt = dto.File != null && dto.File.ContentType.EndsWith("gif") ? "gif" : "webp";
        var bgName = $"{IdHasher.EncodeAccountId(account.Id)}-{DateTime.UtcNow.ToFileTimeUtc()}-bgp.{fileExt}";
        account.ProfilePicUrl = Path.Combine("wwwroot", "accounts", "profile_pictures", $"{bgName}");
        dbContext.Update(account);
        await dbContext.SaveChangesAsync();
        return account.MapToDto();
    }

    public async Task Delete(int id)
    {
        var toDelete = await dbContext.Accounts
            .FirstOrDefaultAsync(a => a.Id == id) ?? throw new NotFoundException($"Could not find account with id {id}");
        
        var currentUserAccount = await accountContextService.GetAccountAsync();
        await AuthorizeAccountOperation(toDelete, ResourceOperation.Delete ,"You have no rights to delete this account");
        
        toDelete.IsDeleted = true;
        dbContext.Accounts.Update(currentUserAccount);
        
        await dbContext.SaveChangesAsync();
    }

    #region Private methods

    private async Task AuthorizeAccountOperation(Account account, ResourceOperation operation, string message)
    {
        var user = accountContextService.User;
        var authorizationResult = await authorizationService.AuthorizeAsync(user, account, new AccountOperationRequirement(operation));
        if (!authorizationResult.Succeeded) throw new ForbidException(message);
    }

    #endregion

}