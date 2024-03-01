import { useDispatch } from 'react-redux';
import styles from './PasswordRecover.module.css';
import { FormEvent, MutableRefObject, useEffect, useRef } from 'react';
import { AppDispatch, RootState } from '../../store';
import { useSelector } from 'react-redux';
import { IAuthSate, passwordRecover, reset } from '../../Slices/authSlice';
import Message from '../../Components/Message/Message';
import { useGetOriginFromQueryParams, useGetTokenFromQueryParams } from '../../Hooks/useGetQueryParams';
import { Link, useNavigate } from 'react-router-dom';

function PasswordRecover() {
	const passwordRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
	const confirmPasswordRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
	const origin = useGetOriginFromQueryParams();	
	const token = useGetTokenFromQueryParams();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const {loading, error, success} = useSelector<RootState, IAuthSate>(state => state.auth);


	async function handleSumit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		
		const data = {
			password: passwordRef.current.value,
			confirmPassword: confirmPasswordRef.current.value,
			token
		}
		
		dispatch(passwordRecover(data));
	}

	useEffect(() => {
		if(success) {
			setTimeout(() => {
				navigate(`/login?o=${origin}`);
			}, 3000);
		}
	}, [success]);

	useEffect(() => {
		dispatch(reset());
	}, [dispatch]);	

	return (
		<div className={styles.sendMail}>
			<h2>Mudança de senha.</h2>
			<form onSubmit={handleSumit}>
			<input 
					id='password'
					type='password'
					disabled={loading}
					autoComplete='new-password'
					placeholder='Atualizar senha Senha.'
					ref={passwordRef}
				/>
				<input 
					id='confirmpassword'
					type='password'
					disabled={loading}
					autoComplete='new-password'
					placeholder='Confirme sua senha.'
					ref={confirmPasswordRef}
				/>
				<input
					type="submit" 
					disabled={loading}
					value={loading ? "Aguarde..." : "Enviar"}
				/>		
				<p>Voltar ao <Link to={`/login?o=${origin}`}>Login</Link></p>
			</form>

			<div className={styles.messages}>
				{error && error.map((errorMessage, index) => (
					<Message key={index} msg={errorMessage} type='error'/>
				))}
				{success && <Message msg={'Senha atualizada com sucesso.'} type='success'/>}
			</div>
		</div>
	)
}

export default PasswordRecover