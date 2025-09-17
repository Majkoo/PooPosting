using Microsoft.EntityFrameworkCore;
using PooPosting.Domain.DbContext.Interfaces;

namespace PooPosting.Domain.DbContext.Pagination;

public static class QueryPagingExtensions
{
    public static async Task<PagedResult<TResult>> GetPageAsync<TEntity, TResult>(
        this IQueryable<TEntity> source,
        IQueryParams qp,
        Func<IQueryable<TEntity>, IQueryable<TEntity>>? filter,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy,
        Func<IQueryable<TEntity>, IQueryable<TResult>> projector,
        bool asNoTracking = true,
        bool asSplitQuery = true,
        CancellationToken ct = default)
        where TEntity : class
    {
        var query = source;

        if (asNoTracking)
            query = query.AsNoTracking();

        if (asSplitQuery)
            query = query.AsSplitQuery();

        if (filter is not null)
            query = filter(query);
        
        query = orderBy(query);

        var total = await query.CountAsync(ct);

        var page = query
            .Skip(qp.PageSize * (qp.PageNumber - 1))
            .Take(qp.PageSize);

        var items = await projector(page).ToListAsync(ct);

        return new PagedResult<TResult>(items, qp.PageNumber, qp.PageSize, total);
    }
    
    public static Task<PagedResult<TResult>> GetPageAsync<TEntity, TResult>(
        this IQueryable<TEntity> source,
        IQueryParams qp,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy,
        Func<IQueryable<TEntity>, IQueryable<TResult>> projector,
        bool asNoTracking = true,
        bool asSplitQuery = true,
        CancellationToken ct = default)
        where TEntity : class
        => GetPageAsync(source, qp, filter: null, orderBy, projector, asNoTracking, asSplitQuery, ct);
}
