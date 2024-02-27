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

const resendActivation = async (email:string, origin: string) => {
	return apiRequests('put', `auth/resend_activation_token?origin=${origin}`, {email});
};

const sendPasswordRecover = async (email:string, origin: string) => {
	return apiRequests('put', `auth/recover_password?origin=${origin}`, {email});
};

export const authService = {
	login, activate, resendActivation, sendPasswordRecover
}