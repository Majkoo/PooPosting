namespace PooPosting.Domain.DbContext.Entities.Joins;

public class AccountLikedTag
{
    public int Id { get; set; }
    public int AccountId { get; set; }
    public int TagId { get; set; }
    
    // navigation props
    public Account Account { get; set; } = null!;
    public Tag Tag { get; set; } = null!;
}