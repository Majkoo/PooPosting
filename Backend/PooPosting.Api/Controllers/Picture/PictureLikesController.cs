using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PooPosting.Application.Services;
using PooPosting.Application.Services.Helpers;

namespace PooPosting.Api.Controllers.Picture;

[ApiController]
[Route("api/picture/{picId}/like")]
public class PictureLikesController(PictureLikingService pictureLikingService) : ControllerBase
{
    [HttpPatch]
    [Authorize]
    [Route("vote-up")]
    public async Task<IActionResult> PatchPictureVoteUp(
        [FromRoute] string picId
        )
    {
        var result = await pictureLikingService.Like(IdHasher.DecodePictureId(picId));
        return Ok(result);
    }

    [HttpPatch]
    [Authorize]
    [Route("vote-down")]
    public async Task<IActionResult> PatchPictureVoteDown(
        [FromRoute] string picId
        )
    {
        var result = await pictureLikingService.DisLike(IdHasher.DecodePictureId(picId));
        return Ok(result);
    }
}