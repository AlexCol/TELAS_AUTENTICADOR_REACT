
import { useDispatch } from 'react-redux';
import { useGetOriginFromQueryParams, useGetTokenFromQueryParams } from '../../Hooks/useGetOriginFromQueryParams';
import styles from './UserActivation.module.css';
import { AppDispatch, RootState } from '../../store';
import { useSelector } from 'react-redux';
import { IAuthSate, activate } from '../../Slices/authSlice';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { reset } from '../../Slices/userSlice';

function UserActivation() {
	const navigate = useNavigate();
	const token = useGetTokenFromQueryParams();
	const origin = useGetOriginFromQueryParams();
	
	const dispatch = useDispatch<AppDispatch>();
	const {success, loading, error} = useSelector<RootState, IAuthSate>(state => state.auth);
	
	useEffect(() => {		
		async function ativateUser() {
			await dispatch(activate(token || '_'));	
			dispatch(reset());
		}
		ativateUser();
	}, [dispatch, token]);

	useEffect(() => {
		if(success) {
			setTimeout(() => {
				navigate(`/login?o=${origin}`);
			}, 3000);
		}
	}, [success]);
	
	return (		
		<div className={styles.activation}>

			{loading && <h3>Processando...</h3>}
			
			{success && (
					<>
					<h3>Usuário ativado.</h3>
					<h4>Em instantes será direcionado a página de login.</h4>
					</>	
			)}

			{error.length > 0 && error.map((err, index) => 				
				<h4 key={index}>{err}</h4>
			)}
			{error.length > 0 && 
							<>
							<h5>Já ativou seu usuário mas não lembra a senha? <Link to={`/auth/password_recover_send?o=${origin}`}>Clique aqui.</Link></h5>							
							<h5>Gostaria de solicitar um novo email de ativação?  <Link to={`/user/activation_resend?o=${origin}`}>Clique aqui.</Link></h5>
							</>
			}
		</div>
	)
}
export default UserActivation