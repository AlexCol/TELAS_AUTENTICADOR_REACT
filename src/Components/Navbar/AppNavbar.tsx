import styles from './AppNavbar.module.css';
import { useMouseCenterEvent } from '../../Hooks/useMouseCenterEvent';
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';


function AppNavbar() {
	const auth = useContext(AuthContext);	
	const isRight = useMouseCenterEvent();
	
	return (
		<nav className={styles.navbar}>
			<div className={styles.nav_home}>
				<h2>Autenticador</h2>
			</div>

			<img className={`${styles.nav_image} ${(isRight ? styles.image_turn : '')}`} src='/Security Guard.ico'/>			
			
			<ul className={styles.nav_links}>
				{/*quando tiver validação de autenticação, esses caminhos devem ficar ocultos se não autenticado*/}
				
				{auth ? (
					<>
						{/* <li>
							<NavLink to="/"><RiHomeGearLine /></NavLink>
						</li>
						<li>
							<span onClick={handleLogout}>Sair</span>
						</li> */}
					</>
				) : (				
					<>
						{/* <li>
							<NavLink to="/register"><GiArchiveRegister /></NavLink>
						</li>
						<li>
							<NavLink to="/login"><GiDoor /></NavLink>
						</li>						 */}
					</>
				)}
			</ul>
		</nav>



	)
}
export default AppNavbar