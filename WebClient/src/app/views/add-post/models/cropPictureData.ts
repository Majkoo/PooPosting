export interface CropPictureData {
  cropBoxData: {
    top?: number,
    left?: number,
    width?: number
  },
  rawFileUrl: string,
  aspectRatio: number
}
