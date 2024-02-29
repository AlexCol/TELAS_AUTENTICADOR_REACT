import styles from './AppNavbar.module.css';
import { RiHomeGearLine } from 'react-icons/ri';
import { GiArchiveRegister, GiDoor } from 'react-icons/gi';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useMouseCenterEvent } from '../../Hooks/useMouseCenterEvent';
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { logout, reset } from '../../Slices/authSlice';


function AppNavbar() {
	const auth = useContext(AuthContext);	
	const isRight = useMouseCenterEvent();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	
	const handleLogout = async () => {
		dispatch(await logout());
		dispatch(reset());
		navigate('/login');
	}
	
	return (
		<nav className={styles.navbar}>
			<Link to='/' className={styles.nav_home}>
				<h2>Autenticador</h2>
			</Link>

			<img className={`${styles.nav_image} ${(isRight ? styles.image_turn : '')}`} src='/Security Guard.ico'/>			
			
			<ul className={styles.nav_links}>
				{/*quando tiver validação de autenticação, esses caminhos devem ficar ocultos se não autenticado*/}
				
				{auth ? (
					<>
						<li>
							<NavLink to="/"><RiHomeGearLine /></NavLink>
						</li>
						<li>
							<span onClick={handleLogout}>Sair</span>
						</li>
					</>
				) : (				
					<>
						<li>
							<NavLink to="/register"><GiArchiveRegister /></NavLink>
						</li>
						<li>
							<NavLink to="/login"><GiDoor /></NavLink>
						</li>						
					</>
				)}
			</ul>
		</nav>



	)
}
export default AppNavbar