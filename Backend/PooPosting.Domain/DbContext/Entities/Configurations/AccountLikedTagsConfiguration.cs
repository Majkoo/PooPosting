using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PooPosting.Domain.DbContext.Entities.Joins;

namespace PooPosting.Domain.DbContext.Entities.Configurations;

public class AccountLikedTagsConfiguration: IEntityTypeConfiguration<AccountLikedTag>
{
    public void Configure(EntityTypeBuilder<AccountLikedTag> builder)
    {
        builder.HasQueryFilter(p => !p.Account.IsDeleted);
        builder.HasKey(a => a.Id);

        builder
            .HasOne(a => a.Account)
            .WithMany(atj => atj.LikedTags);
        builder
            .HasOne(a => a.Tag)
            .WithMany(atj => atj.AccountLikedTags);
    }
}