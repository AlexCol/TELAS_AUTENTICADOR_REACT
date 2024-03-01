import { apiRequests } from "../API/config";

const register = async (data:{data: string}, origin:string) => {
	return apiRequests('post', `/user/register?origin=${origin}`, data);
};

const getProfile = async (token: string) => {
	return apiRequests('get', `/user/profile`, null, token);
};

const updateProfile = async (token: string, data:{data: string}) => {
	return apiRequests('put', `/user`, data, token);
};

const deleteProfile = async (token: string) => {
	return apiRequests('delete', `/user`, null, token);
};

export const userService = {
	register, getProfile, updateProfile, deleteProfile
}