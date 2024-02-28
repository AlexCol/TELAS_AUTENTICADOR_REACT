import { FormEvent, MutableRefObject, useEffect, useRef } from 'react';
import styles from './Login.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useSelector } from 'react-redux';
import { IAuthSate, login, reset } from '../../Slices/authSlice';
import Message from '../../Components/Message/Message';
import { Link } from 'react-router-dom';
import { useGetOriginFromQueryParams } from '../../Hooks/useGetOriginFromQueryParams';

function Login() {
	const dispatch = useDispatch<AppDispatch>();
	const origin = useGetOriginFromQueryParams();
	const {authTokens, loading, error} = useSelector<RootState, IAuthSate>(state => state.auth);

	const emailRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>; //!esse 'as' faz com que não precise validar se o current está ok ou não
	const passwordRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
	
	
	
	function handleSumit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		var loginREquest = {
			email: emailRef.current.value,
			password: passwordRef.current.value
		}

		dispatch(login(loginREquest));
		dispatch(reset());
	}

	useEffect(() => {
		dispatch(reset());
	}, [])

	return (		
		<div className={styles.login}>
			<p>{authTokens && authTokens.accessToken}</p>
			<form onSubmit={handleSumit}>
				<h1>Login</h1>
				<input 
					id='email'
					autoComplete='email'
					type='text'
					required
					disabled={loading}
					placeholder='Informe seu email.'
					ref={emailRef}
				/>
				<input 
					id='confirmpassword'
					type='password'
					disabled={loading}
					required
					autoComplete='new-password'
					placeholder='Sua senha.'
					ref={passwordRef}
				/>
				<input
					type="submit" 
					disabled={loading}
					value={loading ? "Aguarde..." : "Entrar"}					
				/>				
				<div className={styles.messages}>
					{error && error.map((errorMessage, index) => (
						<Message key={index} msg={errorMessage} type='error'/>
					))}
				</div>
				<p>Esqueceu sua senha? <Link to={`/auth/password_recover_send?o=${origin}`}>Clique aqui.</Link></p>
			</form>
		</div>
	)
}
export default Login