using System.ComponentModel.DataAnnotations;

namespace PooPosting.Application.Models.Dtos.Picture.In;

public class UpdatePictureNameDto
{
    [Required]
    [MaxLength(40)]
    public string Name { get; set; }
}