import { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Form, Button, Alert } from 'react-bootstrap'
import { useAppStore } from '../store/useStore'
import { addCart } from '../services/shoppinCart'

type FormValues = {
	metros: number
	color: string
	city: string
}
export default function FormProduct() {
	const { product, showMessage } = useAppStore()

	const { control, watch, handleSubmit } = useForm<FormValues>({
		defaultValues: {
			metros: 1,
			color: '',
			city: '',
		},
	})

	// const metros = watch('metros')
	const color = watch('color')
	const city = watch('city')

	// Filtrar variantes por selección
	const selectedVariant = useMemo(() => {
		if (!product) return undefined
		return product.variants.find((v) => v.color === color && v.city === city)
	}, [color, city, product])

	const hasStock = selectedVariant && selectedVariant.available > 0

	const totalPrice = useMemo(() => {
		if (!product) return 0
		return product.price_per_meter * product.roll_length
	}, [product])

	const onSubmit = async (formData: FormValues) => {
		try {
			if (!hasStock || !product || !selectedVariant) return

			const payload = {
				sku: product.sku,
				quantity: 1,
				properties: {
					desired_meters: formData.metros,
					city: formData.city,
					color: formData.color,
				},
			}

			const response = await addCart(payload)

			console.log('Agregado al carrito:', response)

			showMessage({
				text: 'Producto agregado al carrito',
				type: 'success',
			})
		} catch (error) {
			showMessage({
				text: error instanceof Error ? error.message : String(error),
				type: 'error',
			})
		}
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			{/* Metros */}
			<Form.Group className="mb-3">
				<Form.Label>Metros (1 - 100)</Form.Label>
				<Controller
					name="metros"
					control={control}
					rules={{ required: true, min: 1, max: 100 }}
					render={({ field }) => (
						<Form.Control type="number" min={1} max={100} {...field} />
					)}
				/>
			</Form.Group>

			{/* Color */}
			<Form.Group className="mb-3">
				<Form.Label>Color</Form.Label>
				<Controller
					name="color"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<Form.Select {...field}>
							<option value="">Seleccione un color</option>
							{product &&
								[...new Set(product.variants.map((v) => v.color))].map((c) => (
									<option key={c} value={c}>
										{c}
									</option>
								))}
						</Form.Select>
					)}
				/>
			</Form.Group>

			{/* Ciudad */}
			<Form.Group className="mb-3">
				<Form.Label>Ciudad</Form.Label>
				<Controller
					name="city"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<Form.Select {...field}>
							<option value="">Seleccione una ciudad</option>
							{product &&
								[...new Set(product.variants.map((v) => v.city))].map(
									(city) => (
										<option key={city} value={city}>
											{city}
										</option>
									)
								)}
						</Form.Select>
					)}
				/>
			</Form.Group>

			{/* Precio */}
			<div className="mb-3">
				<strong>Precio: </strong> ${totalPrice.toLocaleString()} (rollo completo
				de {product ? product.roll_length : 0} mts)
			</div>

			{/* Stock */}
			{!hasStock && color && city && (
				<Alert variant="danger">
					Sin stock en {city} para {color}
				</Alert>
			)}

			{hasStock && (
				<Alert variant="secondary">
					Disponible: {selectedVariant?.available} unidades
				</Alert>
			)}

			{/* Botón */}
			<Button
				type="submit"
				variant="primary"
				disabled={!hasStock}
				className="w-100"
			>
				Agregar al carrito
			</Button>
		</Form>
	)
}
