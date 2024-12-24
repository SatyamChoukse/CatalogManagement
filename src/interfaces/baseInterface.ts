export interface IPagination {
    total: number;
    currentPage: number;
    hasMorePages: boolean;
    lastPage: number;
    isEmpty: boolean;
    from: number;
    to: number;
}