using System.Security.Claims;
using Microsoft.AspNetCore.Mvc.Filters;
using PooPosting.Domain.Exceptions;

namespace PooPosting.Api.ActionFilters;

public class RequireAdminRole: ActionFilterAttribute
{
    private const string Msg = "You have no rights to do that.";
    
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var userRole = context.HttpContext.User.FindFirst(c => c.Type == ClaimTypes.Role);
        if ((userRole is null) || (userRole.Value != "3")) throw new ForbidException(Msg);
    }
}