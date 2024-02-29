import { apiRequests } from "../API/config";

const register = async (data:{data: string}, origin:string) => {
	return apiRequests('post', `/user/register?origin=${origin}`, data);
};

export const userService = {
	register
}