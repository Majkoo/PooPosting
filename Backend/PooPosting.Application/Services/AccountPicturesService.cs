using PooPosting.Application.Mappers;
using PooPosting.Application.Models.Dtos.Picture.Out;
using PooPosting.Application.Services.Helpers;
using PooPosting.Domain.DbContext;
using PooPosting.Domain.DbContext.Entities;
using PooPosting.Domain.DbContext.Interfaces;
using PooPosting.Domain.DbContext.Pagination;

namespace PooPosting.Application.Services;

public class AccountPicturesService(PictureDbContext dbContext)
{
    public async Task<PagedResult<PictureDto>> GetPaged(IQueryParams paginationParameters, string accountId)
    {
        var accId = IdHasher.DecodeAccountId(accountId);

        return await dbContext.Pictures.GetPageAsync<Picture, PictureDto>(
            paginationParameters,
            filter: q => q.Where(p => p.AccountId == accId),
            orderBy: q => q.OrderByDescending(p => p.PictureAdded).ThenBy(p => p.Id),
            projector: q => q.ProjectToDto(),
            asNoTracking: true,
            asSplitQuery: true
        );
    }
    
    public async Task<PagedResult<PictureDto>> GetLikedPaged(IQueryParams paginationParameters, string accountId)
    {
        var accId = IdHasher.DecodeAccountId(accountId);

        return await dbContext.Likes.GetPageAsync<Like, PictureDto>(
            paginationParameters,
            filter: q => q.Where(l => l.AccountId == accId),
            orderBy: q => q.OrderByDescending(l => l.Liked).ThenByDescending(l => l.Id),
            projector: q => q.Select(l => l.Picture).ProjectToDto(),
            asNoTracking: true,
            asSplitQuery: true
        );
    }

}