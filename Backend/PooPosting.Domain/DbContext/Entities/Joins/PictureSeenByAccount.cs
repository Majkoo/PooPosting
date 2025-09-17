
namespace PooPosting.Domain.DbContext.Entities.Joins;

public class PictureSeenByAccount
{
    public int Id { get; set; }
    public int PictureId { get; set; }
    public int AccountId { get; set; }

    // navigation props
    public Account Account { get; set; } = null!;
    public Picture Picture { get; set; } = null!;

}