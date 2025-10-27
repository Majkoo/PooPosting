using HashidsNet;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using PooPosting.Domain.Exceptions;
using System.Text.Json;

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
        catch (AppException e)
        {
            var errorResponse = new
            {
                error = new
                {
                    code = e.Code,
                    message = e.Message
                }
            };
            context.Response.StatusCode = 409;
            await context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse));
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