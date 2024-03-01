import { useEffect, useState } from "react";
import { api } from "../API/config";

	//! Função para disparar eventos personalizados quando ocorrerem mudanças no localStorage
	function emitLocalStorageEvent(): void {
		const customEvent = new CustomEvent('localStorageChange');
		window.dispatchEvent(customEvent);
	}

	//! Função para adicionar tokens ao localStorage e emitir um evento de mudança
	export function addTokens(tokenName: string, value: string) {
		localStorage.setItem(tokenName, value);
		emitLocalStorageEvent();
	}

	//! Função para remover tokens ao localStorage e emitir um evento de mudança
	export function removeTokens(tokenName: string) {
		localStorage.removeItem(tokenName);
		emitLocalStorageEvent();
	}	

export const useAuth = () => {
	//! Estado para armazenar o status da autenticação
	const [auth, setAuth] = useState<boolean>(false);
	//! Estado para controlar o carregamento
	const [loading, setLoading] = useState(true);

	//! Função assíncrona para validar o token de acesso
	async function validateToken() {
		//! Verifica se o token de acesso está presente no localStorage
		const accessToken = localStorage.getItem('accessToken');
		if (!accessToken) {
			//! Se não houver token, define autenticação como false e finaliza o carregamento
			setAuth(false);
			setLoading(false);	
			return;
		};	

		//! Define que o carregamento está em andamento
		setLoading(true);
		try {
			//! Tenta fazer uma requisição para verificar a autenticação
			await api.get("/auth", {headers : {Authorization: `Bearer ${accessToken}`}})
			//! Se a requisição for bem-sucedida, define autenticação como true
			setAuth(true);
		} catch {
			//! Se ocorrer um erro na requisição, define autenticação como false
			setAuth(false);
		};
		//! Finaliza o carregamento
		setLoading(false);
	};

	//! Função para lidar com as alterações no localStorage e validar o token
	async function handleLocalStorageChange() {
		await validateToken();
	}

	//! Função para um listener de eventos capturados em outras abas (que mexeram no storage) disparar na aba local
	async function localStorageFromOtherTabs(event: StorageEvent) {
		if (event.key === 'accessToken') {
			await validateToken();
		}
	}

	//! Efeito para realizar a validação do token quando o hook é inicializado
	useEffect(() => {
		const firstValidation = async () => {
			await validateToken();
		}
		firstValidation();
	}, []);

	//! Efeito para adicionar e remover os listeners de eventos de alteração no localStorage
	useEffect(() => {
		window.addEventListener('storage', localStorageFromOtherTabs);
		window.addEventListener('localStorageChange', handleLocalStorageChange);
		return () => {
			window.removeEventListener('storage', localStorageFromOtherTabs);	
			window.removeEventListener('localStorageChange', handleLocalStorageChange);
		};
	}, []);
		
	//! Retorna o status da autenticação, o estado de carregamento e a função para adicionar tokens
	return {auth, loading};
}
