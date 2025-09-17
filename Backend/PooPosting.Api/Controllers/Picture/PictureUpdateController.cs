using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PooPosting.Application.Models.Dtos.Picture.In;
using PooPosting.Application.Services;
using PooPosting.Application.Services.Helpers;

namespace PooPosting.Api.Controllers.Picture;

[ApiController]
[Authorize]
[Route("api/picture/{picId}")]
public class PictureUpdateController(PictureService pictureService) : ControllerBase
{
    [HttpPatch]
    [Route("name")]
    public async Task<IActionResult> UpdatePictureName(
        [FromRoute] string picId,
        [FromBody] UpdatePictureNameDto dto
    )
    {
        return Ok(await pictureService.UpdateName(IdHasher.DecodePictureId(picId), dto));
    }

    [HttpPatch]
    [Route("description")]
    public async Task<IActionResult> UpdatePictureDescription(
        [FromRoute] string picId,
        [FromBody] UpdatePictureDescriptionDto dto
    )
    {
        return Ok(await pictureService.UpdateDescription(IdHasher.DecodePictureId(picId), dto));
    }

    [HttpPatch]
    [Route("tags")]
    public async Task<IActionResult> UpdatePictureTags(
        [FromRoute] string picId,
        [FromBody] UpdatePictureTagsDto dto
    )
    {
        return Ok(await pictureService.UpdateTags(IdHasher.DecodePictureId(picId), dto));
    }
}