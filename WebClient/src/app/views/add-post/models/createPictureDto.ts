import {PostVisibility} from "../../../shared/utility/enums/postVisibility";

export interface CreatePictureDto {
  tags: string[],
  description: string,
  visibilityOption: PostVisibility,
  url: string,
}

export function toFormData(dto: CreatePictureDto): FormData {
  const formData = new FormData();
  formData.append("dataUrl", dto.url);
  formData.append("visibilityOption", (dto.visibilityOption ?? 0).toString());
  if (dto.tags) {
    dto.tags.forEach((tag) => formData.append("tags", tag))
  }
  if (dto.description) formData.append("description", dto.description);

  return formData;
}
