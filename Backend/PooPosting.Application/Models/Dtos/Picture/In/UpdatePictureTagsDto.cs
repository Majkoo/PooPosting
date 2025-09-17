using System.ComponentModel.DataAnnotations;

namespace PooPosting.Application.Models.Dtos.Picture.In;

public class UpdatePictureTagsDto
{
    [Required]
    [MaxLength(4)]
    public string[] Tags { get; set; }
}