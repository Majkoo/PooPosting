namespace PooPosting.Domain.Exceptions;

public class NotFoundException : Exception
{
    public NotFoundException(string? message = "Resource not found") : base(message)
    {
            
    }
}