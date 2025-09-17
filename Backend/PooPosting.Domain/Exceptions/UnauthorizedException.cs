namespace PooPosting.Domain.Exceptions;

public class UnauthorizedException: Exception
{
    public UnauthorizedException(string? message = "Unauthorized") : base(message)
    {

    }
}