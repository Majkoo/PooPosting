using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace PooPosting.Domain.DbContext.Entities.Configurations;

public class LikeConfiguration: IEntityTypeConfiguration<Like>
{
    public void Configure(EntityTypeBuilder<Like> builder)
    {
        builder.HasQueryFilter(l => !l.Account.IsDeleted);
        builder.HasIndex(c => c.Liked);
        builder.HasKey(c => c.Id);
    }
}