import { useDispatch } from 'react-redux';
import styles from './Profile.module.css';
import { AppDispatch, RootState } from '../../store';
import { useSelector } from 'react-redux';
import { IUserSate, deleteProfile, getProfile, reset, updateProfile } from '../../Slices/userSlice';
import { FormEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import Message from '../../Components/Message/Message';
import { IUpdateData } from '../../Interfaces/IUpdateData';
import { Modal } from 'react-bootstrap';
import { logout } from '../../Slices/authSlice';
import { useGetOriginFromQueryParams } from '../../Hooks/useGetQueryParams';
import { decrypt } from '../../Utils/Crypto';

function Profile() {
	const emailRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>; //!esse 'as' faz com que não precise validar se o current está ok ou não
	const origin = useGetOriginFromQueryParams();
	const firstNameRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
	const lastNameRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
	const passwordRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
	const confirmPasswordRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	
	const dispatch = useDispatch<AppDispatch>();	
	const {user, error, loading, success} = useSelector<RootState, IUserSate>(state => state.user);
	const handleSumit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const updateData:IUpdateData = {};
		if (firstNameRef.current.value)
			updateData.FirstName = firstNameRef.current.value;
		if (lastNameRef.current.value)
			updateData.LastName = lastNameRef.current.value;
		if (passwordRef.current.value) 
			updateData.Password = passwordRef.current.value;
		if (confirmPasswordRef.current.value)
			updateData.ConfirmPassword = confirmPasswordRef.current.value;
		
		dispatch(updateProfile(updateData));
	}

	const handleDelete = () => {
		dispatch(deleteProfile());
	}

	const showModal = () => {
		setShowDeleteModal(true);
	}
	const closeModal = () => {
		setShowDeleteModal(false);
	}

	const handleLogout = async () => {
		dispatch(await logout());
		dispatch(reset());
	}

	const handleGoBack = () => {
		const storageToken = localStorage.getItem('accessToken');
			if (storageToken) {
				const decryptOrigin = decrypt(origin);			
				const token = localStorage.getItem('accessToken');
				window.location.href = (`${decryptOrigin}?t=${token}`);
			}
	}

	useEffect(() => {
		if(success) {
			passwordRef.current.value = '';
			confirmPasswordRef.current.value = '';
			setTimeout(() => {
				dispatch(reset());
				
			}, 3000);
		}
	}, [error, success]);

	useEffect(() => {
		if (user) {
			emailRef.current.value = user.Email;
			firstNameRef.current.value = user.FirstName;
			lastNameRef.current.value = user.LastName;		
		}
	}, [user]);

	useEffect(() => {
		dispatch(getProfile());		
	}, [dispatch]);

	useEffect(() => {
		dispatch(reset());
	}, []);

	return (
		<div className={styles.profile}>
			<div className={styles.btns_container}>
				{user && <button className={styles.delete_btn} onClick={showModal}>{loading ? "Aguarde..." : "Deletar"}</button>}
				{user && <button className={styles.logout_btn} onClick={handleLogout}>{loading ? "Aguarde..." : "Sair"}</button>}
				{user && origin !== 'self' && <button className={styles.back_btn} onClick={handleGoBack}>{loading ? "Aguarde..." : "Voltar"}</button>}
			</div>
			<h2>Dados do usuário.</h2>
			<p className={styles.subtitle}>Código de Identificação: </p>
			{user && (
				<>
				<p className={styles.userId}>{user.id}</p>				
				<form onSubmit={handleSumit}>
				<input 
					id='email'
					autoComplete='email'
					type='text'
					disabled={true}
					placeholder='Email.'
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
					value={loading ? "Aguarde..." : "Atualizar"}
				/>
			</form>
			<div className={styles.messages}>
				{error && error.map((errorMessage, index) => (
					<Message key={index} msg={errorMessage} type='error'/>
				))}
				{success && <Message msg={success} type='success'/>}
			</div>	
			</>
			)}

			<Modal className={styles.modal} show={showDeleteModal} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title className={styles.modal_header}>Deletar usuário.</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deseja mesmo deletar o usuário? Essa ação não pode ser desfeita.</Modal.Body>
        <Modal.Footer>
          <button onClick={closeModal}>
            Fechar
          </button>
					<button className={styles.delete_btn_modal} onClick={handleDelete}>
            Deletar
          </button>
        </Modal.Footer>
      </Modal>
		</div>
	)
}
export default Profile
