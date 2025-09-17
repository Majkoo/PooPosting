namespace PooPosting.Domain.DbContext.Interfaces;

public interface IQueryParams
{
    public int PageSize { get; set; }
    public int PageNumber { get; set; }
    
    public string? OrderBy { get; set; }
    public string? Direction { get; set; }
}