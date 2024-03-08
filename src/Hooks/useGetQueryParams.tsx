import { useMemo } from "react";
import { useLocation } from "react-router-dom";


export function useGetOriginFromQueryParams() {
	const {search} = useLocation();	
	return useMemo(() => new URLSearchParams(search).get("o") || 'self', [search]);
}
export function useGetTokenFromQueryParams() {
	const {search} = useLocation();	
	return useMemo(() => new URLSearchParams(search).get("t") || '', [search]);
}
export function useGetItemFromQueryParams(par:string) {
	const {search} = useLocation();	
	return useMemo(() => new URLSearchParams(search).get(par) || '', [search]);
}