using PooPosting.Application.Models.Dtos.Account.Out;

namespace PooPosting.Application.Models.Dtos.Comment.Out;

public class CommentDto
{
    public string Id { get; set; } = null!;
    public string Text { get; set; } = null!;
    public DateTime CommentAdded { get; set; }

    public string PictureId { get; set; } = null!;
    public AccountDto Account { get; set; } = null!;
}