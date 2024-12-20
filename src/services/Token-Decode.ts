import { jwtDecode } from "jwt-decode";

interface ITokenDecode {
    role: string,
    id: string,
    email: string,
    contact: string,
    name: string,
    exp: number
}

export const decodeToken = (token: string): ITokenDecode | null => {
    try {
        return jwtDecode<ITokenDecode>(token);
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};



export const isTokenExpired = (token: string): boolean => {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) {
        return true; // Consider invalid or missing exp tokens as expired
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime;
};