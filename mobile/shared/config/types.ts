export type Pagination<T> = {
    data: T[];
    meta: Meta;
};

export type Meta = {
    currentPage: number;
    perPage: number;
    totalElements: number;
    totalPages: number;
};
