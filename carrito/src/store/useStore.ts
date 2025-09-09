import { create } from 'zustand'
import type { Product, Message } from '../types'

interface AppState {
	product: Product | null
	setProduct: (product: Product | null) => void

	message: Message | null
	showMessage: (message: Message) => void
}

export const useAppStore = create<AppState>((set) => ({
	product: null,
	setProduct: (product) => set({ product }),

	message: null,
	showMessage: (message) => {
		set({ message })
		setTimeout(() => set({ message: null }), 5000)
	},
}))
