export interface IPaginationRequest {
    isPaginate: boolean,
    top: number,
    pageNumber: number,
    search: string,
    orderBy: {
        fieldName: string,
        sort: string
    },
    startDate: string | null,
    endDate: string | null,
}