import { useAppStore } from '../store/useStore.ts'
import { Container, Row, Col } from 'react-bootstrap'
import FormProduct from './FormProduct.tsx'

function ProductView() {
	const { product } = useAppStore()

	return (
		<Container className="py-4">
			<Row>
				<Col>
					<h2 className="mb-4">{product ? product.product : ''}</h2>
					<FormProduct />
				</Col>
			</Row>
		</Container>
	)
}

export default ProductView
