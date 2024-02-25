import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import styles from './AppNavbar.module.css';

function AppNavbar() {
	return (
		<div className={styles.navbar}>
			<Navbar>
				<Container>
					<Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="#home">Home</Nav.Link>
							<Nav.Link href="#link">Link</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	)
}
export default AppNavbar