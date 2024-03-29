import { apiRequests } from "../API/config";

const login = async (data: string) => {
	return apiRequests('post', `/auth/signin`, {data});
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

const passwordRecover = async (data: string, token: string) => {
	return apiRequests('put', `auth/newpassword?t=${token}`, {data});
};

export const authService = {
	login, activate, resendActivation, sendPasswordRecover, passwordRecover
}