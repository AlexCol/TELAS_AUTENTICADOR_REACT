import styles from './PasswordRecoverSend.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { FormEvent, MutableRefObject, useEffect, useRef } from 'react';
import { useGetOriginFromQueryParams } from '../../Hooks/useGetQueryParams';
import { IAuthSate, reset, sendPasswordRecover } from '../../Slices/authSlice';
import Message from '../../Components/Message/Message';
import { Link, useNavigate } from 'react-router-dom';


function PasswordRecoverSend() {
	const dispatch = useDispatch<AppDispatch>();
	const emailRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>; //!esse 'as' faz com que não precise validar se o current está ok ou não
	const origin = useGetOriginFromQueryParams();	
	const {loading, error, success} = useSelector<RootState, IAuthSate>(state => state.auth);
	const navigate = useNavigate();


	async function handleSumit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const data = {
			email: emailRef.current.value,
			origin : origin||'self'
		}
		await dispatch(sendPasswordRecover(data));
		
		emailRef.current.value = '';
		setTimeout(() => {			
			dispatch(reset());
			navigate(`/login?o=${origin}`);
		}, 3000);
	}

	useEffect(() => {
		dispatch(reset());
	}, [dispatch]);	

	return (
		<div className={styles.sendMail}>
			<h2>Solicitação de troca de senha.</h2>
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

				<p>Voltar ao <Link to={`/login?o=${origin}`}>Login</Link></p>
			</form>

			<div className={styles.messages}>
				{error && error.map((errorMessage, index) => (
					<Message key={index} msg={errorMessage} type='error'/>
				))}
				{success && <Message msg={'Email de recuperação enviado com sucesso.'} type='success'/>}
			</div>
			
		</div>
	)
}

export default PasswordRecoverSend