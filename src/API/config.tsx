import axios from "axios";

//! variables
export const authCookieName = 'authUser';
//export const autenticadorBaseUrl = 'http://localhost:5085'
export const autenticadorBaseUrl = 'https://autenticador.onrender.com'
export const api = axios.create({
	baseURL: autenticadorBaseUrl
});

//! functions
export async function apiRequests(method: string, url: string, data?: any, token?: string) {
	let headers = {};
	if (token) {
		headers = {Authorization: `Bearer ${token}`};
	}
	const response = await api({
		method,
		url,
		data,
		headers
	})
	.then((res) => {
		if(!res.data && method.toLowerCase() !== 'delete') {
			throw new Error("Empty Data");
		}
		return res.data;
	})
	.catch((error) => {
		if (error.response && error.response.data) {
			const errorMessage = error.response.data;
			return { errorMessage };
		} else {
			return { errorMessage: [error.message] };
		}
	});
	return response;
}