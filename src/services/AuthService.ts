import { ILoginForm } from "@/interfaces/request/login";
import api from "../http/api";
import { IApiResponse } from "@/interfaces/response/response";

export const login = async (data: ILoginForm) => {
    try {
        return await api.post<IApiResponse<{token:string}>>('Login', data);
    } catch (error) {
        throw error;
    }
}


// const authService = new AuthService();

// export default authService