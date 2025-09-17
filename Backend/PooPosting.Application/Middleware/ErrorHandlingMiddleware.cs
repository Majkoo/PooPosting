using HashidsNet;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using PooPosting.Domain.Exceptions;

namespace PooPosting.Application.Middleware;

public class ErrorHandlingMiddleware(
    ILogger<ErrorHandlingMiddleware> logger
    ) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next.Invoke(context);
        }
        catch (BadRequestException e)
        {
            context.Response.StatusCode = 400;
            await context.Response.WriteAsync(e.Message);
        }
        catch (UnauthorizedException e)
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync(e.Message);
        }
        catch (ForbidException e)
        {
            context.Response.StatusCode = 403;
            await context.Response.WriteAsync(e.Message);
        }
        catch (NotFoundException)
        {
            context.Response.StatusCode = 404;
            await context.Response.WriteAsync("Resource not found");
        }
        catch (NoResultException)
        {
            context.Response.StatusCode = 404;
            await context.Response.WriteAsync("Resource not found");
        }
        catch (Exception e)
        {
            logger.LogError(e, e.Message);
            context.Response.StatusCode = 500;
            await context.Response.WriteAsync("Something went wrong");
        }
    }
}