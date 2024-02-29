import { ReactNode, useContext } from "react"
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

interface IRestrictedRouteProps {
    children: ReactNode,
		canAccessLoggeIn?: boolean
    canAccessLoggedOut?: boolean
}

export const RestrictedRoute = ({children, canAccessLoggeIn = false, canAccessLoggedOut = false}: IRestrictedRouteProps) => {
	const auth = useContext(AuthContext);
	console.log(auth);
	return (
			<>
			{auth
					?
					canAccessLoggeIn ? children : <Navigate to="/"/>
					:
					canAccessLoggedOut ? children : <Navigate to="/login"/>
			}
			</>
	)
}