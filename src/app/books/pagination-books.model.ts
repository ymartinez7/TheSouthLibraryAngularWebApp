import { Book } from './book.model';

export interface PaginationBooks {
  pageSize: number;
  page: number;
  sort: string;
  sortDirection: string;
  pagesQuantity: number;
  data: Book[];
  filterValue: {
    property: string;
    value: string;
  };
  totalRows: number;
}
