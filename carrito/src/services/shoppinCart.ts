import axios from 'axios'
import type { ProductPayload } from '../types'

const BASE_URL = `${import.meta.env.VITE_API}/cart`

export async function addCart(payload: ProductPayload) {
	const response = await axios.post(`${BASE_URL}/add`, payload)
	return response.data
}
