using Microsoft.AspNetCore.Mvc;
using PooPosting.Application.Models.Dtos.Auth.In;
using PooPosting.Application.Services;

namespace PooPosting.Api.Controllers.Auth;

[ApiController]
[Route("api/auth")]
public class AccountAuthController(AuthService authService) : ControllerBase
{
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var accountId = await authService.RegisterAccount(dto);
        return Created($"/api/account/{accountId}", null);
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var result = await authService.GenerateJwt(dto);
        return Ok(result);
    }

    [HttpPost]
    [Route("refresh")]
    public async Task<IActionResult> RefreshJwt([FromBody] RefreshSessionDto dto)
    {
        var result = await authService.GenerateJwt(dto);
        return Ok(result);
    }
    
    [HttpPost]
    [Route("forgetTokens")]
    public async Task<IActionResult> ForgetTokens([FromBody] ForgetSessionDto dto)
    {
        await authService.Forget(dto);
        return Ok();
    }

}
