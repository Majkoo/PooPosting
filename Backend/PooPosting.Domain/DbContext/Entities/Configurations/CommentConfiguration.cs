using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace PooPosting.Domain.DbContext.Entities.Configurations;

public class CommentConfiguration: IEntityTypeConfiguration<Comment>
{
    public void Configure(EntityTypeBuilder<Comment> builder)
    {
        builder.HasQueryFilter(c => !c.IsDeleted && !c.Account.IsDeleted);
        builder.HasIndex(c => c.CommentAdded);
        builder.HasKey(c => c.Id);
    }
}