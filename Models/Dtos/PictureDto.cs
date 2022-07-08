﻿using PicturesAPI.Enums;

namespace PicturesAPI.Models.Dtos;

public class PictureDto
{
    public string Id { get; set; }
    public IEnumerable<string> Tags { get; set; }

    public string Name { get; set; }
    public string Description { get; set; }

    public AccountPreviewDto AccountPreview { get; set; }

    public string Url { get; set; }
    public DateTime PictureAdded { get; set; }

    public IEnumerable<LikeDto> Likes { get; set; }
    public IEnumerable<CommentDto> Comments { get; set; }

    public int LikeCount { get; set; }
    public int DislikeCount { get; set; }
    public int CommentCount { get; set; }

    public LikeState LikeState { get; set; } = LikeState.Deleted;
    public bool IsModifiable { get; set; } = false;
    public bool IsAdminModifiable { get; set; } = false;
}