using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PooPosting.Application.Models.Dtos.Account.In;
using PooPosting.Application.Services;

namespace PooPosting.Api.Controllers.Account;

[ApiController]
[Authorize]
[Route("api/account/update")]
public class AccountUpdateController(AccountService accountService) : ControllerBase
{
    [HttpPost]
    [Route("email")]
    public async Task<IActionResult> UpdateAccountEmail(
        [FromBody] UpdateAccountEmailDto dto
    )
    {
        return Ok(await accountService.UpdateEmail(dto));
    }

    [HttpPost]
    [Route("password")]
    public async Task<IActionResult> UpdateAccountPassword(
        [FromBody] UpdateAccountPasswordDto dto
    )
    {
        return Ok(await accountService.UpdatePassword(dto));
    }

    [HttpPost]
    [Route("username")]
    public async Task<IActionResult> UpdateAccountUsername(
        [FromBody] UpdateAccountUsernameDto Username
    )
    {
        return Ok(await accountService.UpdateUsername(Username));
    }

    [HttpPatch]
    [Route("profile-picture")]
    public async Task<IActionResult> UpdateAccountProfilePic(
        [FromForm] UpdateAccountPictureDto dto
    )
    {
        return Ok(await accountService.UpdateProfilePicture(dto));

    }

    [HttpPatch]
    [Route("background-picture")]
    public async Task<IActionResult> UpdateAccountBackgroundPic(
        [FromForm] UpdateAccountPictureDto dto
    )
    {
        return Ok(await accountService.UpdateBackgroundPicture(dto));

    }
}