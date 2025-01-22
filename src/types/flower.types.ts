import { IFlowerImage } from './flower-image.types'

export interface IFlower {
	id: number
	title: string
	description: string
	price: number
	discountedPrice: number
	currency: string
	imageUrl: string
	height: number
	width: number
	flowerImages: IFlowerImage[]
	isActive: boolean
	order: number
	createdAt: string
	updatedAt: string
}

export interface ICreateFlower
	extends Omit<IFlower, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IUpdateFlower
	extends Omit<IFlower, 'createdAt' | 'updatedAt'> {}
