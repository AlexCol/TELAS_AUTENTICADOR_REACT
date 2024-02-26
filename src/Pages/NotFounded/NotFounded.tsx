import { Link } from 'react-router-dom';
import styles from './NotFounded.module.css';
import { GoLightBulb } from 'react-icons/go';

function NotFounded() {
	return (
		<div className={styles.notFound}>
			<GoLightBulb />
			<h1>Página não encontrada!</h1>
			<p><span><Link to='/'>Clique aqui</Link></span> para voltar a pagina principal.</p>
		</div>
	)
}
export default NotFounded
