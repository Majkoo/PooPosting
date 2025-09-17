using System.ComponentModel.DataAnnotations;

namespace PooPosting.Application.Models.Dtos.Picture.In;

public class CreatePictureDto
{
    [MaxLength(500)]
    public string? Description { get; set; }
    
    [MaxLength(4)]
    public string[]? Tags { get; set; }

    [MaxLength(4194304)] public string DataUrl { get; set; } = null!;
}