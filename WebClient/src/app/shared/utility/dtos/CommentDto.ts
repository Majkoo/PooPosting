import {AccountPreviewDto} from "./AccountPreviewDto";

export interface CommentDto {
  id: string;
  pictureId: string,
  text: string,
  isModifiable: boolean,
  isAdminModifiable: boolean,
  commentAdded: string
  account: AccountPreviewDto,
}
