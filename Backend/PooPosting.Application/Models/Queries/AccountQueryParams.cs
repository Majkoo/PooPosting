using PooPosting.Domain.DbContext.Interfaces;

namespace PooPosting.Application.Models.Queries;

public class AccountQueryParams: IQueryParams
{
    public string? SearchPhrase { get; set; }
    
    public int PageSize { get; set; }
    public int PageNumber { get; set; }
    
    public string? OrderBy { get; set; }
    public string? Direction { get; set; }
}