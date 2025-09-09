import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

import CartIcon from '/cart-svgrepo-com.svg'

function NavbarCart() {
	return (
		<Navbar expand="lg" className="bg-body-tertiary mb-3">
			<Container>
				<Navbar.Brand href="#home">
					<img
						src={CartIcon}
						alt="Icon"
						width="30"
						height="30"
						className="d-inline-block align-top"
					/>{' '}
					Carrito
				</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Text>by: Cristian Londoño F</Navbar.Text>
			</Container>
		</Navbar>
	)
}

export default NavbarCart
