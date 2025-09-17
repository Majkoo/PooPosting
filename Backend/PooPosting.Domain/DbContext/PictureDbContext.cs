using Microsoft.EntityFrameworkCore;
using PooPosting.Domain.DbContext.Entities;
using PooPosting.Domain.DbContext.Entities.Joins;

namespace PooPosting.Domain.DbContext;

public class PictureDbContext : Microsoft.EntityFrameworkCore.DbContext
{
    public PictureDbContext(DbContextOptions<PictureDbContext> options) : base(options) { }
        
    public virtual required DbSet<Picture> Pictures { get; set; }
    public virtual required DbSet<Account> Accounts { get; set; }
    public virtual required DbSet<Role> Roles { get; set; }
    public virtual required DbSet<Like> Likes { get; set; }
    public virtual required DbSet<Comment> Comments { get; set; }
    public virtual required DbSet<Tag> Tags { get; set; }

    // many-to-many
    public virtual required DbSet<PictureTag> PictureTags { get; set; }
    public virtual required DbSet<PictureSeenByAccount> PicturesSeenByAccounts { get; set; }
    public virtual required DbSet<AccountLikedTag> AccountsLikedTags { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(PictureDbContext).Assembly);
    }
}