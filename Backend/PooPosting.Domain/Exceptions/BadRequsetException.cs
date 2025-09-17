namespace PooPosting.Domain.Exceptions;

public class BadRequestException : Exception
{
    public BadRequestException(string message) : base(message)
    {
            
    }
}