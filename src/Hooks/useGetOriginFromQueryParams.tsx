import { useMemo } from "react";
import { useLocation } from "react-router-dom";


export function useGetOriginFromQueryParams() {
	const {search} = useLocation();	
	return useMemo(() => new URLSearchParams(search).get("o"), [search]);
}
export function useGetTokenFromQueryParams() {
	const {search} = useLocation();	
	return useMemo(() => new URLSearchParams(search).get("t"), [search]);
}