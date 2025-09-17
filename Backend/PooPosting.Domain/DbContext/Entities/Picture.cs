using System.ComponentModel.DataAnnotations;
using PooPosting.Domain.DbContext.Entities.Joins;
using PooPosting.Domain.DbContext.Interfaces;

namespace PooPosting.Domain.DbContext.Entities;

public class Picture: IIdentifiable
{
    [Key]
    public int Id { get; set; }
    public int AccountId { get; set; }
    
    [MinLength(2)]
    [MaxLength(250)]
    public string? Description { get; set; }
    
    [MaxLength(255)]
    [Required]
    public string Url { get; set; } = null!;
    
    [Required]
    public DateTime PictureAdded { get; set; } = DateTime.UtcNow;

    [Required]
    public bool IsDeleted { get; set; } = false;

    [Required]
    public long PopularityScore { get; set; } = 36500;

    // navigation props
    public virtual Account Account { get; set; } = null!;
    public virtual ICollection<Like> Likes { get; set; } = null!;
    public virtual ICollection<Comment> Comments { get; set; } = null!;
    public virtual ICollection<PictureTag> PictureTags { get; set; } = null!;
    public virtual ICollection<PictureSeenByAccount> SeenByAccount { get; set; } = null!;
}