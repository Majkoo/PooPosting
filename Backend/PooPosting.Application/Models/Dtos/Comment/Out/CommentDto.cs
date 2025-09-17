using PooPosting.Application.Models.Dtos.Account.Out;

namespace PooPosting.Application.Models.Dtos.Comment.Out;

public class CommentDto
{
    public string Id { get; set; }
    public string Text { get; set; }
    public DateTime CommentAdded { get; set; }

    public string PictureId { get; set; }
    public AccountDto Account { get; set; }
}