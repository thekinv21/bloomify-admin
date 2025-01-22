import { API_URL } from '@/constant'

import {
	ICreateFlowerImage,
	ICustomResponse,
	IFlowerImage,
	IUpdateFlowerImage
} from '@/types'
import { IPaginationParams } from '@/types/custom.types'

import { axiosWithAuth } from './axios/axios'

class FlowerImageService {
	private BASE_URL = `${API_URL}/api/flower-image`

	async getAll(params: IPaginationParams) {
		const response = await axiosWithAuth.get<ICustomResponse<IFlowerImage[]>>(
			`${this.BASE_URL}/admin`,
			{
				params
			}
		)
		return response
	}

	async getAllActive() {
		const response = await axiosWithAuth.get<ICustomResponse<IFlowerImage[]>>(
			`${this.BASE_URL}`
		)
		return response
	}

	async getById(flowerImageId: number) {
		const response = await axiosWithAuth.get<ICustomResponse<IFlowerImage>>(
			`${this.BASE_URL}/admin/${flowerImageId}`
		)
		return response
	}

	async getActiveById(flowerImageId: number) {
		const response = await axiosWithAuth.get<ICustomResponse<IFlowerImage>>(
			`${this.BASE_URL}/${flowerImageId}`
		)
		return response
	}

	async getAllByFlowerId(flowerId: number) {
		const response = await axiosWithAuth.get<ICustomResponse<IFlowerImage>>(
			`${this.BASE_URL}/flower/${flowerId}`
		)
		return response
	}

	async create(req: ICreateFlowerImage) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}`, req)
		return response
	}

	async update(req: IUpdateFlowerImage) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}`, req)
		return response
	}

	async toggle(flowerImageId: number) {
		const response = await axiosWithAuth.patch(
			`${this.BASE_URL}/${flowerImageId}`
		)
		return response
	}

	async delete(flowerImageId: number) {
		const response = await axiosWithAuth.delete(
			`${this.BASE_URL}/${flowerImageId}`
		)
		return response
	}
}

export const flowerImageService = new FlowerImageService()
