import { SortSearchBy } from "../enums/sortSearchBy";

export interface SearchQuery {
  searchPhrase: string,
  pageNumber: number,
  pageSize: number,
  sortBy?: SortSearchBy,
}
