using System.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace PooPosting.Application.Middleware;

public class RequestTimeMiddleware(
    ILogger<RequestTimeMiddleware> logger
    ) : IMiddleware
{
    private readonly Stopwatch stopwatch = new();

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        stopwatch.Start();
        await next.Invoke(context);
        stopwatch.Stop();

        var elapsedMilliseconds = stopwatch.ElapsedMilliseconds;
        if (elapsedMilliseconds / 1000 > 4)
        {
            var message =
                $"Request [{context.Request.Method}] at {context.Request.Path} took {elapsedMilliseconds} ms";
            logger.LogInformation(message);
        }
    }
}