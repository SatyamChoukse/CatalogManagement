import { ILoginForm } from "@/interfaces/login";
import api from "./api";

export const login = async (data: ILoginForm) => {
    try {
        return await api.post('Login', data);
    } catch (error) {
        throw error;
    }
}


// const authService = new AuthService();

// export default authService