namespace PooPosting.Domain.DbContext.Pagination;

public class PagedResult<T>(
    IEnumerable<T> items, 
    int pageNumber, 
    int pageSize, 
    int totalItems
    )
{
    public IEnumerable<T> Items { get; set; } = items;
    public int Page { get; set; } = pageNumber;
    public int PageSize { get; set; } = pageSize;
    public int TotalItems { get; set; } = totalItems;
    public int TotalPages { get; set; } = (int)Math.Ceiling(totalItems/(double)pageSize);
}