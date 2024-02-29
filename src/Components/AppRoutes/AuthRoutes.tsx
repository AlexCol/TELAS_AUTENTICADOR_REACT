import { Navigate, Route } from "react-router-dom";
import { RestrictedRoute } from "./RestrictedRoute";
import Profile from "../../Pages/Profile/Profile";

export const AuthRoutes = () => {
	return (
    <>
        {/* can only be acceced if logged in */}        
				<Route path="/" element={<RestrictedRoute canAccessLoggeIn={true}><Profile /></RestrictedRoute>}/>
				<Route path='/profile' element={<Navigate to="/"/>}/>
    </>
	);
}