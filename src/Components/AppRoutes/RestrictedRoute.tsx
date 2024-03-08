import { ReactNode, useContext } from "react"
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useGetItemFromQueryParams, useGetOriginFromQueryParams, useGetTokenFromQueryParams } from "../../Hooks/useGetQueryParams";

interface IRestrictedRouteProps {
    children: ReactNode,
		canAccessLoggeIn?: boolean
    canAccessLoggedOut?: boolean
}

export const RestrictedRoute = ({children, canAccessLoggeIn = false, canAccessLoggedOut = false}: IRestrictedRouteProps) => {
	const auth = useContext(AuthContext);
	const origin = useGetOriginFromQueryParams();

	const token = useGetTokenFromQueryParams();
	const checkRedirect = useGetItemFromQueryParams('r');
	if(checkRedirect) {
		switch (checkRedirect) {
			case 'a':
				return <Navigate to={`/user/activation?t=${token}&o=${origin}`}/>;
			case 'p':
				return <Navigate to={`/auth/password_recover?t=${token}&o=${origin}`}/>
		}
	}		

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