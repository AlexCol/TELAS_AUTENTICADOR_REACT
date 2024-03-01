import styles from './Register.module.css';
import { useGetOriginFromQueryParams } from '../../Hooks/useGetQueryParams';
import { FormEvent, MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Message from '../../Components/Message/Message';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useSelector } from 'react-redux';
import { IUserSate, register, reset } from '../../Slices/userSlice';
import { IRegisterData } from '../../Interfaces/IRegisterData';


function Register() {
	const origin = useGetOriginFromQueryParams();
	const emailRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>; //!esse 'as' faz com que não precise validar se o current está ok ou não
	const firstNameRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
	const lastNameRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
	const passwordRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
	const confirmPasswordRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
	const [pageError, setPageError] = useState<string>('');

	const {success, loading, error} = useSelector<RootState, IUserSate>(state => state.user);
	const dispatch = useDispatch<AppDispatch>();

	
	async function handleSumit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setPageError('');

		const registerData:IRegisterData = {
			Email: emailRef.current.value,
			FirstName: firstNameRef.current.value,
			LastName: lastNameRef.current.value,
			Password: passwordRef.current.value,
			ConfirmPassword: confirmPasswordRef.current.value
		}

		await dispatch(register({registerData, origin: origin||'self'}));
		
		setTimeout(() => {
			dispatch(reset());
		}, 3000);
	};
	
	useEffect(() => {
		dispatch(reset());
	}, []);

	useMemo(() => {
		if(success) {
			emailRef.current.value = '';
			firstNameRef.current.value = '';
			lastNameRef.current.value = '';
			passwordRef.current.value = '';
			confirmPasswordRef.current.value = '';
		}
	}, [success])

	return (		
		<div className={styles.register}>
			<h2>Registre-se</h2>
			<p className={styles.subtitle}>Registre-se para user o sistema de autenticação</p>
					
			<form onSubmit={handleSumit}>
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
					id='firstname'
					autoComplete='given-name'
					type='text'
					required
					disabled={loading}
					placeholder='Nome.'
					ref={firstNameRef}
				/>
				<input 
					id='lastname'
					autoComplete='family-name'
					type='text'
					required
					disabled={loading}
					placeholder='Sobrenome.'
					ref={lastNameRef}
				/>
				<input 
					id='password'
					type='password'
					disabled={loading}
					required
					autoComplete='new-password'
					placeholder='Senha.'
					ref={passwordRef}
				/>
				<input 
					id='confirmpassword'
					type='password'
					disabled={loading}
					required
					autoComplete='new-password'
					placeholder='Confirme sua senha.'
					ref={confirmPasswordRef}
				/>
				<input
					type="submit" 
					disabled={loading}
					value={loading ? "Aguarde..." : "Cadastrar"}					
				/>
			</form>	
			
			<div className={styles.messages}>
				{error && error.map((errorMessage, index) => (
					<Message key={index} msg={errorMessage} type='error'/>
				))}
				{pageError && <Message msg={pageError} type='error'/>}
				{success && <Message msg={success} type='success'/>}
			</div>			

			<p>Já possui conta? <Link to={`/login?o=${origin || 'self'}`}>Clique aqui</Link> para logar.</p>			
		</div>
	)
}
export default Register
