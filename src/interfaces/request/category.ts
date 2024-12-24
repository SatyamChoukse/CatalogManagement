import { IPaginationRequest } from "./pagination";

export interface ICategoryRequest extends IPaginationRequest {
    isActive: boolean | null,
    categoryType: string | null
}