import { apiRequests } from "../API/config";
import { IRegisterData } from "../Interfaces/IRegisterData";



const register = async (data:IRegisterData, origin:string) => {
	return apiRequests('post', `/user/register?origin=${origin}`, data);
};

export const userService = {
	register
}