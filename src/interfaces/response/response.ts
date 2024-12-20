
export interface ITableResponse<T> {
    iterableData: T,
    count: number
}
export interface IApiResponse<T> {
    data: T,
    errorMessage: string,
}