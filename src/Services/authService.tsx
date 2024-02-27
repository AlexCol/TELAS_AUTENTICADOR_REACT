import { apiRequests } from "../API/config";

interface ILoginData {
	Email: string,
	Password: string
}

const login = async (data:ILoginData) => {
	return apiRequests('post', `/auth/signin`, data);
};

const activate = async (token:string) => {
	return apiRequests('put', `/auth/activate?t=${token}`);
};

export const authService = {
	login, activate
}