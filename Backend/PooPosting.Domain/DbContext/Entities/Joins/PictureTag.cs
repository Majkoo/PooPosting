namespace PooPosting.Domain.DbContext.Entities.Joins;

public class PictureTag
{
    public int Id { get; set; }
    public int PictureId { get; set; }
    public int TagId { get; set; }

    public Picture Picture { get; set; } = null!;
    public Tag Tag { get; set; } = null!;
}