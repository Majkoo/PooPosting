﻿// using Microsoft.AspNetCore.Mvc.Filters;
// using PicturesAPI.Exceptions;
// using PicturesAPI.Repos.Interfaces;
//
// namespace PicturesAPI.ActionFilters;
//
// public class CanPostFilter: ActionFilterAttribute
// {
//     private readonly IRestrictedIpRepo _restrictedIpRepo;
//
//     public CanPostFilter(
//         IRestrictedIpRepo restrictedIpRepo)
//     {
//         _restrictedIpRepo = restrictedIpRepo;
//     }
//
//     public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
//     {
//         var remoteIp = context.HttpContext.Connection.RemoteIpAddress!.ToString();
//         var restrictedIp = await _restrictedIpRepo.GetByIpAsync(remoteIp);
//         if (restrictedIp is null || !restrictedIp.CantPost)
//         {
//             await next.Invoke();
//             return;
//         };
//         throw new ForbidException("Your ip is restricted");
//     }
// }