import styles from './AppNavbar.module.css';
import { Link, NavLink } from 'react-router-dom';
import { RiHomeGearLine } from 'react-icons/ri';
import { GiArchiveRegister } from 'react-icons/gi';
import { useMouseCenterEvent } from '../Hooks/useMouseCenterEvent';

function AppNavbar() {
	const isRight = useMouseCenterEvent();
	
	return (
		<nav className={styles.navbar}>
			<Link to='/' className={styles.nav_home}>
				<h2>Autenticador</h2>
			</Link>

			<img className={`${styles.nav_image} ${(isRight ? styles.image_turn : '')}`} src='/Security Guard.ico'/>			
			
			<ul className={styles.nav_links}>
				{/*quando tiver validação de autenticação, esses caminhos devem ficar ocultos se não autenticado*/}
				<li>
					<NavLink to="/profile"><RiHomeGearLine /></NavLink>
				</li>
				<li>
					<NavLink to="/register"><GiArchiveRegister /></NavLink>
				</li>
				<li>
					<span>Sair</span>
				</li>	
				{/*quando tiver validação de autenticação, esses caminhos devem ficar ocultos se não autenticado*/}
			</ul>
		</nav>



	)
}
export default AppNavbar