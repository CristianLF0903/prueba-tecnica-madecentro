export interface Inventory {
	city: string
	sku: string
	available: number
}

export interface Product {
	product: string
	price_per_meter: number
	roll_length: number
	sku: string
	variants: Variant[]
}

interface Variant {
	color: string
	city: string
	available: number
}

export interface ProductPayload {
	sku: string
	quantity: number
	properties: {
		desired_meters: number
		city: string
		color: string
	}
}

export interface Recommendations {
	sku: string
	score: number
	tags: string[]
}

export interface Message {
	text: string
	type: 'error' | 'success' | 'alert' | 'info'
}
