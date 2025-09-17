export interface PagedResult<T> {
  items: T[];
  totalPages: number;
  totalItems: number;
  pageSize: number;
  page: number;
}
