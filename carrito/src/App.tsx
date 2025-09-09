import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarCart from './components/NavbarCart.tsx'
import { useEffect } from 'react'
import { useAppStore } from './store/useStore'
import { getInventory } from './services/inventory.ts'
import ProductView from './components/ProductView.tsx'
import { Alert } from 'react-bootstrap'

function App() {
	const { product, setProduct, showMessage, message } = useAppStore()

	const load = async () => {
		try {
			const data = await getInventory()

			setProduct(data[0])
		} catch (error) {
			console.error(error)

			showMessage({
				text: error instanceof Error ? error.message : String(error),
				type: 'error',
			})
		}
	}

	useEffect(() => {
		load()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<NavbarCart />
			<main className="container-full mx-4">
				{message && (
					<Alert variant={message.type} className="mt-3">
						{message.text}
					</Alert>
				)}
				{product ? <ProductView /> : <h1>Producto no encontrado</h1>}
			</main>
		</>
	)
}

export default App
