export interface GetPictureQuery {
  searchPhrase: string,
  pageNumber: 2 | 3 | 5 | 10,
  pageSize: number,
  likedTags: string
}
