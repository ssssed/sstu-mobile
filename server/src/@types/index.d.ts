type PaginationType<T> = {
  data: T;
  meta: Meta;
};

type Meta = {
  currentPage: number;
  perPage: number;
  totalPages: number;
  totalElements: number;
};
