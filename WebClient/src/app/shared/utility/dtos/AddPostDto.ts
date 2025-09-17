import {PostVisibility} from "../enums/postVisibility";

export interface AddPostDto {
  file: string;
  description: string;
  tags: string[];
  visibilityOption: PostVisibility;
}
