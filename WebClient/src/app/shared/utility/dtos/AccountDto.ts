import {PictureDto} from "./PictureDto";

export interface AccountDto {
  id: string;
  roleId: string;
  nickname: string;
  email: string;
  profilePicUrl: string;
  backgroundPicUrl: string;
  accountDescription: string;
  accountCreated: string;
  provider: string;

  pictures: PictureDto[];
  pictureCount: number;
  likeCount: number;
  commentCount: number;

  isModifiable: boolean;
  isAdminModifiable: boolean;
}
