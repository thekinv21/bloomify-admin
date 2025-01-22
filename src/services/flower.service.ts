import { API_URL } from '@/constant'

import { ICreateFlower, ICustomResponse, IFlower, IUpdateFlower } from '@/types'
import { IPaginationParams } from '@/types/custom.types'

import { axiosWithAuth } from './axios/axios'

class FlowerService {
	private BASE_URL = `${API_URL}/api/flower`

	async getAll(params: IPaginationParams) {
		const response = await axiosWithAuth.get<ICustomResponse<IFlower[]>>(
			`${this.BASE_URL}/admin`,
			{
				params
			}
		)
		return response
	}

	async getAllActive() {
		const response = await axiosWithAuth.get<ICustomResponse<IFlower[]>>(
			`${this.BASE_URL}`
		)
		return response
	}

	async getById(flowerId: number) {
		const response = await axiosWithAuth.get<ICustomResponse<IFlower>>(
			`${this.BASE_URL}/admin/${flowerId}`
		)
		return response
	}

	async getActiveById(flowerId: number) {
		const response = await axiosWithAuth.get<ICustomResponse<IFlower>>(
			`${this.BASE_URL}/${flowerId}`
		)
		return response
	}

	async create(req: ICreateFlower) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}`, req)
		return response
	}

	async update(req: IUpdateFlower) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}`, req)
		return response
	}

	async toggle(flowerId: number) {
		const response = await axiosWithAuth.patch(`${this.BASE_URL}/${flowerId}`)
		return response
	}

	async delete(flowerId: number) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${flowerId}`)
		return response
	}
}

export const flowerService = new FlowerService()
