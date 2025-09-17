using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace PooPosting.Application.Mappers;

public static class MapperContext
{
    private static IHttpContextAccessor? httpCtx;
    public static void Initialize(IHttpContextAccessor httpContextAccessor)
    {
        httpCtx = httpContextAccessor;
    }
    
    internal static int? CurrentUserId => 
        int.TryParse(httpCtx?.HttpContext?.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value, out var accountId) ? accountId : null;
    
}