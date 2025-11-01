import type { LoginUser } from "../../types/auth/login.types"
import type { RegisterUser } from "../../types/auth/register.types";
import { AuthApiUrl } from "../apiUrl.constant"
import { apiClient } from "../client"

export const loginUser = async (payload: LoginUser) => {
    const res = await apiClient.post(AuthApiUrl.login.url, payload);
    console.log("res", res);
    return res.data;
}

export const registerUser = async (payload: RegisterUser) => {
    const res = await apiClient.post(AuthApiUrl.register.url, payload);
    return res.data;
}

export const logoutUser = async () => {
    const res = await apiClient.post(AuthApiUrl.logout.url);
    return res.data;
}

export const getCurrentUser = async () => {
    const res = await apiClient.get(AuthApiUrl.currentuser.url);
    return res.data;
}