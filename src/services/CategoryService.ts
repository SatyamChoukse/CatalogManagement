import AppRoute from "@/conf/appRoutes";
import api from "@/http/api";
import { ICategoryRequest } from "@/interfaces/request/category";
import { ICategoryResponse } from "@/interfaces/response/category";
import { IApiResponse, ITableResponse } from "@/interfaces/response/response";

export const getAllCategory = async ({ request, signal }: {
    request: ICategoryRequest,
    signal: AbortSignal
}): Promise<ITableResponse<ICategoryResponse[]>> => {
    try {
        const response = await api.post<IApiResponse<ITableResponse<ICategoryResponse[]>>>(AppRoute.getAllCategory, request, { signal });
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
