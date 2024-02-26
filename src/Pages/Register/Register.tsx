import styles from './Register.module.css';
import { useGetOriginFromQueryParams } from '../../Components/Hooks/useSearchParam';
import { FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Message from '../../Components/Message/Message';

function Register() {
	const origin = useGetOriginFromQueryParams();
	const emailRef = useRef<HTMLInputElement>(null);
	const firstNameRef = useRef<HTMLInputElement>(null);
	const lastNameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);
	const [pageError, setPageError] = useState<string>('');
	
	function handleSumit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setPageError('');

		console.log("cadastrou");
		setPageError('errour');
	}
	
	return (		
		<div className={styles.register}>
			<h2>Registre-se</h2>
			<p className={styles.subtitle}>Registre-se para user o sistema de autenticação</p>
			
			<div className={styles.messages}>
				{pageError && <Message msg={pageError} type='error'/>}
			</div>
			
			<form onSubmit={handleSumit}>
				<input 
					id='email'
					autoComplete='email'
					type='text'
					placeholder='Informe seu email.'
					ref={emailRef}
				/>
				<input 
					id='firstname'
					autoComplete='given-name'
					type='text'
					placeholder='Nome.'
					ref={firstNameRef}
				/>
				<input 
					id='lastname'
					autoComplete='family-name'
					type='text'
					placeholder='Sobrenome.'
					ref={lastNameRef}
				/>
				<input 
					id='password'
					type='password'
					autoComplete='new-password'
					placeholder='Senha.'
					ref={passwordRef}
				/>
				<input 
					id='confirmpassword'
					type='password'
					autoComplete='new-password'
					placeholder='Confirme sua senha.'
					ref={confirmPasswordRef}
				/>
				<input
					type="submit" 
					value={"Cadastrar"}
					//disabled= {loading}
				/>

			</form>
			
			<p>Já possui conta? <Link to='/'>Clique aqui</Link> para logar.</p>
			
		</div>
	)
}
export default Register
