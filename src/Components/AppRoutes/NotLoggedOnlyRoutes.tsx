import { Route } from "react-router-dom";
import { RestrictedRoute } from "./RestrictedRoute";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";

export const NotLoggedOnlyRoutes = () => {
	return (
		<>
			{/* can only be acceced if logged out */}
			<Route path="/login" element={<RestrictedRoute canAccessLoggedOut={true}><Login/></RestrictedRoute>}/>
			<Route path="/register" element={<RestrictedRoute canAccessLoggedOut={true}><Register/></RestrictedRoute>}/>
		</>
	);
}