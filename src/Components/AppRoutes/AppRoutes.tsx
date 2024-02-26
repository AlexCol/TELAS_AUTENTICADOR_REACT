import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import styles from './AppRoutes.module.css';
import Login from '../../Pages/Login/Login';
import Register from '../../Pages/Register/Register';
import Profile from '../../Pages/Profile/Profile';
import PasswordRecover from '../../Pages/PasswordRecover/PasswordRecover';
import AppNavbar from '../Navbar/AppNavbar';
import NotFounded from '../../Pages/NotFounded/NotFounded';

function AppRoutes() {
	return (
		<BrowserRouter>
			<AppNavbar/>
			<div className={styles.routes}>
				<Routes>
					<Route path='/' element={<Login />}/>
					<Route path='/register' element={<Register />}/>
					<Route path='/profile' element={<Profile />}/>
					<Route path='/passreco' element={<PasswordRecover />}/>
					<Route path='*' element={<NotFounded />}/>
				</Routes>
			</div>
			<Footer/>							
		</BrowserRouter>
	)
}
export default AppRoutes