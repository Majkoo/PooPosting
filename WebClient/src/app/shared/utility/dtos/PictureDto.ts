import {AccountDto} from "./AccountDto";
import {CommentDto} from "./CommentDto";

export interface PictureDto {
  id: string;
  account: AccountDto,

  name: string;
  description: string;
  tags: string[];
  url: string;
  pictureAdded: string;

  comments: CommentDto[];
  commentCount: number;
  likeCount: number;
  dislikeCount: number;

  isLiked: boolean;
  isModifiable: boolean;
  isAdminModifiable: boolean;
}
