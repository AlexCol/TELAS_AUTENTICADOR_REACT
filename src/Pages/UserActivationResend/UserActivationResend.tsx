import { useDispatch } from 'react-redux';
import styles from './UserActivationResend.module.css';
import { FormEvent, MutableRefObject, useEffect, useRef } from 'react';
import { AppDispatch, RootState } from '../../store';
import { useSelector } from 'react-redux';
import { IAuthSate, resendActivation, reset } from '../../Slices/authSlice';
import Message from '../../Components/Message/Message';
import { useGetOriginFromQueryParams } from '../../Hooks/useGetOriginFromQueryParams';

function UserActivationResend() {
	const dispatch = useDispatch<AppDispatch>();
	const emailRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>; //!esse 'as' faz com que não precise validar se o current está ok ou não
	const origin = useGetOriginFromQueryParams();	
	const {loading, error, success} = useSelector<RootState, IAuthSate>(state => state.auth);


	async function handleSumit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const data = {
			email: emailRef.current.value,
			origin : origin||'self'
		}
		await dispatch(resendActivation(data));
		
		emailRef.current.value = '';
		setTimeout(() => {			
			dispatch(reset());	
		}, 3000);
	}

	useEffect(() => {
		dispatch(reset());
	}, [dispatch]);	

	return (
		<div className={styles.sendMail}>
			<h2>Reenvio de email de ativação.</h2>
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
					type="submit" 
					disabled={loading}
					value={loading ? "Aguarde..." : "Enviar"}					
				/>				
			</form>

			<div className={styles.messages}>
				{error && error.map((errorMessage, index) => (
					<Message key={index} msg={errorMessage} type='error'/>
				))}
				{success && <Message msg={'Email reenviado com sucesso.'} type='success'/>}
			</div>
		</div>
	)
}

export default UserActivationResend