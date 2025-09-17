using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace PooPosting.Application.Middleware;

public class HttpLoggingMiddleware(
    ILogger<HttpLoggingMiddleware> logger
    ) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        await next.Invoke(context);

        var userName = context.User.FindFirst(c => c.Type == ClaimTypes.Name);
        var userRole = context.User.FindFirst(c => c.Type == ClaimTypes.Role);
        var log = $"## Client IP: '{context.Connection.RemoteIpAddress}'";
        
        if (userName is not null && userRole is not null)
        {
            log += $" ## Client Nickname: {userName.Value}, RoleID: {userRole.Value}";
        }
        log += $" ## Request: '{context.Request.Method}' at '{context.Request.Path}', with status code: '{context.Response.StatusCode}'. ##";

        switch (context.Request.Method)
        {
            case ("GET"):
                logger.LogInformation(log);
                break;
            
            default:
                logger.LogWarning(log);
                break;
        }
    }
}