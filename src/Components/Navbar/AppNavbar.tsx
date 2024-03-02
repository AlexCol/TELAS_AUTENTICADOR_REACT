import styles from './AppNavbar.module.css';
import { useMouseCenterEvent } from '../../Hooks/useMouseCenterEvent';
import { Link } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';


function AppNavbar() {
	const isRight = useMouseCenterEvent();
	
	return (
		<nav className={styles.navbar}>
			<div className={styles.nav_home}>
				<h2>Autenticador</h2>
			</div>

			<img className={`${styles.nav_image} ${(isRight ? styles.image_turn : '')}`} src='/Security Guard.ico'/>			
			
			<ul className={styles.nav_links}>
				{/* optador por não ter links para as demais paginas, por precisar usar o 'origin', e pelo navbar, não rola */}
				<Link to='/about'>
					<FiAlertCircle />
				</Link>
				

			</ul>
		</nav>



	)
}
export default AppNavbar