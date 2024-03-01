import { ReactNode, useContext } from "react"
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useGetOriginFromQueryParams } from "../../Hooks/useGetOriginFromQueryParams";

interface IRestrictedRouteProps {
    children: ReactNode,
		canAccessLoggeIn?: boolean
    canAccessLoggedOut?: boolean
}

export const RestrictedRoute = ({children, canAccessLoggeIn = false, canAccessLoggedOut = false}: IRestrictedRouteProps) => {
	const auth = useContext(AuthContext);
	const origin = useGetOriginFromQueryParams();
	console.log(origin);
	return (
			<>
			{auth
					?
					canAccessLoggeIn ? children : <Navigate to={`/?o=${origin}`}/>
					:
					canAccessLoggedOut ? children : <Navigate to={`/login?o=${origin}`}/>
			}
			</>
	)
}