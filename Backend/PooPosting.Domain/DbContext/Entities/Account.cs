using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using PooPosting.Domain.DbContext.Entities.Joins;
using PooPosting.Domain.DbContext.Interfaces;

namespace PooPosting.Domain.DbContext.Entities;

public class Account: IIdentifiable
{
    [Key]
    public int Id { get; set; }

    public const int MaxNicknameLength = 25;
    [Required]
    [MaxLength(MaxNicknameLength)]
    public string Nickname { get; set; } = null!;
    
    [Required]
    [MaxLength(100)]
    public string Email { get; set; } = null!;

    [Required]
    [MaxLength(255)]
    public string PasswordHash { get; set; } = null!;
    
    [Required] 
    [DefaultValue(false)] 
    public bool Verified { get; set; }
    
    [Required]
    public DateTime AccountCreated { get; set; } = DateTime.UtcNow;

    [Required]
    public bool IsDeleted { get; set; } = false;

    [Required]
    public int RoleId { get; set; } = 1;

    [Required]
    public string Provider { get; set; } = "Pooposting";

    [AllowNull]
    public string ProfilePicUrl { get; set; }
    
    [MaxLength(64)] 
    public string? RefreshToken { get; set; }
    public string? GoogleId { get; set; }

    public DateTime? RefreshTokenExpires { get; set; }
    
    

    public Role Role { get; set; } = null!;
    
    [AllowNull] 
    public ICollection<Picture> Pictures { get; set; }
    
    [AllowNull] 
    public ICollection<Like> Likes { get; set; }
    
    [AllowNull] 
    public ICollection<Comment> Comments { get; set; }
    
    [AllowNull] 
    public ICollection<PictureSeenByAccount> PicturesSeen { get; set; }
   
    [AllowNull] 
    public ICollection<AccountLikedTag> LikedTags { get; set; }
}