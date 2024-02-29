import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import styles from './AppRoutes.module.css';
import AppNavbar from '../Navbar/AppNavbar';
import NotFounded from '../../Pages/NotFounded/NotFounded';
import { AuthRoutes } from './AuthRoutes';
import { NotLoggedOnlyRoutes } from './NotLoggedOnlyRoutes';

function AppRoutes() {	
	return (
		<BrowserRouter>
			<AppNavbar/>
			<div className={styles.routes}>
				<Routes>
					{/*  free routes */}	
					
					{/* logged in only routes */}
					{AuthRoutes()}

					{/* all RestrictedRoute are by default bloqued, must specify if can be acceced while logged in ou loggedout*/}
					{/* can only be acceced if logged out */}
					{NotLoggedOnlyRoutes()}
					
					<Route path='*' element={<NotFounded />}/>
				</Routes>
			</div>
			<Footer/>							
		</BrowserRouter>
	)
}
export default AppRoutes