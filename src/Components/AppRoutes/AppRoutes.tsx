import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import styles from './AppRoutes.module.css';
import Login from '../../Pages/Login/Login';
import Register from '../../Pages/Register/Register';
import Profile from '../../Pages/Profile/Profile';
import PasswordRecover from '../../Pages/PasswordRecover/PasswordRecover';
import AppNavbar from '../Navbar/AppNavbar';

function AppRoutes() {
	return (
		<div className={styles.router}>
			<BrowserRouter>
				<table>
					<tr className={styles.router_header}>
						<AppNavbar/>
					</tr>
					<tr className={styles.router_body}>
						<Routes>
							<Route path='/' element={<Login />}/>
							<Route path='/register' element={<Register />}/>
							<Route path='/profile' element={<Profile />}/>
							<Route path='/passreco' element={<PasswordRecover />}/>

							<Route path='/*' element={<Login />}/>
						</Routes>
					</tr>
					<tr className={styles.router_footer}>
						<Footer/>
					</tr>
				</table>
			</BrowserRouter>
		</div>
	)
}
export default AppRoutes