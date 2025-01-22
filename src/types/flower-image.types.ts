export interface IFlowerImage {
	id: number
	imageTitle: string
	imageCost: string
	imageUrl: string
	isMainImage: boolean
	isActive: boolean
	order: number
	createdAt: string
	updatedAt: string
}

export interface ICreateFlowerImage
	extends Omit<IFlowerImage, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IUpdateFlowerImage
	extends Omit<IFlowerImage, 'createdAt' | 'updatedAt'> {}
