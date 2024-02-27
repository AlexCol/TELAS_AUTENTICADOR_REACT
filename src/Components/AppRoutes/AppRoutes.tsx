import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import styles from './AppRoutes.module.css';
import Login from '../../Pages/Login/Login';
import Register from '../../Pages/Register/Register';
import Profile from '../../Pages/Profile/Profile';
import PasswordRecover from '../../Pages/PasswordRecover/PasswordRecover';
import AppNavbar from '../Navbar/AppNavbar';
import NotFounded from '../../Pages/NotFounded/NotFounded';
import UserActivation from '../../Pages/UserActivation/UserActivation';
import UserActivationResend from '../../Pages/UserActivationResend/UserActivationResend';
import PasswordRecoverSend from '../../Pages/PasswordRecoverSend/PasswordRecoverSend';

function AppRoutes() {
	return (
		<BrowserRouter>
			<AppNavbar/>
			<div className={styles.routes}>
				<Routes>
					{/* need auth */}
					<Route path='/' element={<Profile />}/> {/*  */}

					{/* dont need auth */}					
					<Route path='/login' element={<Login />}/>
					<Route path='/register' element={<Register />}/>					
					
					<Route path='/auth/password_recover' element={<PasswordRecover />}/>					
					<Route path='/auth/password_recover_send' element={<PasswordRecoverSend />}/>					
					
					<Route path='/user/activation' element={<UserActivation />}/>
					<Route path='/user/activation_resend' element={<UserActivationResend />}/>
					
					<Route path='*' element={<NotFounded />}/>
				</Routes>
			</div>
			<Footer/>							
		</BrowserRouter>
	)
}
export default AppRoutes