using Microsoft.EntityFrameworkCore;
using PooPosting.Domain.DbContext;
using PooPosting.Domain.DbContext.Entities;
using PooPosting.Domain.DbContext.Entities.Joins;

namespace PooPosting.Application.Services.Helpers;

public class LikeHelper(
    PictureDbContext dbContext
    )
{
    public async Task<Picture> LikeAsync(
        int picId,
        int accId
        )
    {
        var account = dbContext.Accounts
            .Include(a => a.LikedTags)
            .SingleOrDefault(a => a.Id == accId)!;

        var picture = dbContext.Pictures
            .Include(p => p.Account)
            .Include(p => p.Likes)
            .ThenInclude(l => l.Account)
            .Include(p => p.PictureTags)
            .ThenInclude(pt => pt.Tag)
            .SingleOrDefault(p => p.Id == picId)!;

        var like = picture.Likes.SingleOrDefault(l => l.AccountId == accId);

        List<AccountLikedTag> accLikedTags = account.LikedTags.ToList();
        List<Like> picLikes = picture.Likes.ToList();

        if (like is null)
        {
            accLikedTags.AddRange(picture.PictureTags
                .Select(pictureTag => new AccountLikedTag()
                {
                    AccountId = accId, TagId = pictureTag.TagId
                }));
            picLikes.Add(new Like()
            {
                AccountId = accId,
                PictureId = picId,
            });
            picture.Likes = picLikes;
            account.LikedTags = accLikedTags;
            picture.PopularityScore = PictureScoreCalculator.CalcPoints(picture);
            await dbContext.SaveChangesAsync();
        }
        else
        {
                foreach (var pictureTag in picture.PictureTags)
                {
                    accLikedTags = accLikedTags
                        .Where(alt => alt.TagId != pictureTag.TagId)
                        .ToList();
                }
                picLikes.Remove(like);
        }
        picture.Likes = picLikes;
        account.LikedTags = accLikedTags;
        picture.PopularityScore = PictureScoreCalculator.CalcPoints(picture);
        await dbContext.SaveChangesAsync();
        return picture;
    }

    public async Task<Picture> DislikeAsync(
        int picId,
        int accId
        )
    {
        var account = dbContext.Accounts
            .Include(a => a.LikedTags)
            .SingleOrDefault(a => a.Id == accId)!;

        var picture = dbContext.Pictures
            .Include(p => p.Account)
            .Include(p => p.Likes)
            .ThenInclude(l => l.Account)
            .Include(p => p.PictureTags)
            .ThenInclude(pt => pt.Tag)
            .SingleOrDefault(p => p.Id == picId)!;

        var like = picture.Likes.SingleOrDefault(l => l.AccountId == accId);

        List<AccountLikedTag> accLikedTags = account.LikedTags.ToList();
        List<Like> picLikes = picture.Likes.ToList();

        if (like is null)
        {
            picLikes.Add(new Like()
            {
                AccountId = accId,
                PictureId = picId,
            });
            picture.Likes = picLikes;
            account.LikedTags = accLikedTags;
            picture.PopularityScore = PictureScoreCalculator.CalcPoints(picture);
            await dbContext.SaveChangesAsync();
            return picture;
        }
        
        foreach (var pictureTag in picture.PictureTags)
        {
            accLikedTags = accLikedTags
                .Where(alt => alt.TagId != pictureTag.TagId)
                .ToList();
        }
        return picture;
    }
}