﻿using Microsoft.EntityFrameworkCore;
using PooPosting.Domain.DbContext.Interfaces;

namespace PooPosting.Domain.DbContext.Pagination;

public static class DbSetPagination
{
    public static async Task<PagedResult<T>> Paginate<T>(
        this IQueryable<T> query,
        IPaginationParameters pagination
    ) where T : class
    {
        var items = await query
            .Skip(pagination.PageSize * (pagination.PageNumber - 1))
            .Take(pagination.PageSize)
            .ToListAsync();
        var totalItems = await query.CountAsync();
        
        return new PagedResult<T>(
            items,
            pagination.PageNumber,
            pagination.PageSize,
            totalItems
        );
    }
}