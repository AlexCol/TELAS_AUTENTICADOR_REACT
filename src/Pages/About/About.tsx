import { Link } from 'react-router-dom';
import styles from './About.module.css';
import { autenticadorBaseUrl } from '../../API/config';

function About() {
	return (
		<div className={styles.about}>			
			<h1>Sobre</h1>
			<ul>
				<li>Pagina criada usando:</li>
				<ul>
					<li>React</li>
					<li>Typescript</li>
					<li>React-Bootstrap (para o modal de exclusão)</li>
					<li>React-Router-Dom</li>
					<li>React-Icons</li>
					<li>Axios</li>
					<li>Redux</li>
					<li>Crypto-js - para recebimento e envio de dados cryptografados</li>
				</ul>
				<li>Pagina usada para consumir dados do <span><Link to={`${autenticadorBaseUrl}/swagger/index.html`}>Autenticador</Link></span>.</li>
			</ul>
			<p><span><Link to='/'>Clique aqui</Link></span> para voltar a pagina principal.</p>
		</div>
	)
}
export default About
