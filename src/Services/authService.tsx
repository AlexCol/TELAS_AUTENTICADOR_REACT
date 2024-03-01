import { apiRequests } from "../API/config";

const login = async (data: string) => {
	return apiRequests('post', `/auth/signin`, {data});
};

const logout = async (token:string) => {
	return apiRequests('put', `/auth/revoke`, null, token);
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
	login, logout, activate, resendActivation, sendPasswordRecover
}