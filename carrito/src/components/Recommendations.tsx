import { useEffect, useState } from 'react'
import { getRecommendations } from '../services/recommendations'
import { useAppStore } from '../store/useStore'
import type { Recommendations } from '../types'

import { Card, Badge, Row, Col, Alert, Spinner } from 'react-bootstrap'

export default function Recommendations() {
	const { product, showMessage } = useAppStore()
	const [recommendations, setRecommendations] = useState<Recommendations[]>([])
	const [loading, setLoading] = useState(false)

	const load = async () => {
		setLoading(true)
		try {
			const data = product ? await getRecommendations(product?.sku) : []
			setRecommendations(data)
		} catch (error) {
			showMessage({
				text: error instanceof Error ? error.message : String(error),
				type: 'error',
			})
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		load()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product])

	return (
		<section className="my-4">
			<h2 className="mb-3">También te puede servir</h2>

			{loading && (
				<div className="text-center my-4">
					<Spinner animation="border" variant="primary" />
				</div>
			)}

			{!loading && recommendations.length === 0 && (
				<Alert variant="info">No hay recomendaciones disponibles</Alert>
			)}

			<Row xs={1} md={3} className="g-4">
				{recommendations.map((data) => (
					<Col key={data.sku}>
						<Card className="h-100 shadow-sm">
							<Card.Body>
								<Card.Title className="d-flex justify-content-between align-items-center">
									<span>{data.sku}</span>
									<Badge bg="primary" pill>
										Score: {data.score.toFixed(2)}
									</Badge>
								</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">Tags</Card.Subtitle>
								<div className="d-flex flex-wrap gap-2 mt-2">
									{data.tags.map((tag) => (
										<Badge key={tag} bg="secondary">
											{tag}
										</Badge>
									))}
								</div>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</section>
	)
}
