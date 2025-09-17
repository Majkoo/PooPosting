using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PooPosting.Application.Models.Dtos.Comment.In;
using PooPosting.Application.Services;
using PooPosting.Application.Services.Helpers;

namespace PooPosting.Api.Controllers.Comment;

[ApiController]
[Authorize]
[Route("api/comment")]
public class CommentController(CommentService commentService) : ControllerBase
{
    [HttpPatch]
    [Route("{commId}")]
    public async Task<IActionResult> PatchComment(
        [FromRoute] string commId,
        [FromBody] PostPutCommentDto text
        )
    {
        var result = await commentService.Update(IdHasher.DecodeCommentId(commId), text.Text);
        return Ok(result);
    }
    
    [HttpDelete]
    [Route("{commId}")]
    public async Task<IActionResult> DeleteComment(
        [FromRoute] string commId
        )
    {
        await commentService.Delete(IdHasher.DecodeCommentId(commId));
        return NoContent();
    }
}