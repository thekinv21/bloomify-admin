import {
	ICreateUserRequest,
	ICustomResponse,
	IUpdateUserRequest,
	IUser
} from '@/types'
import { IOption } from '@/types/custom.types'

import { API_URL, axiosWithAuth } from '../axios/axios'

class UserService {
	private BASE_URL = `${API_URL}/api/user`

	async getAll() {
		const response = await axiosWithAuth.get<ICustomResponse<IUser[]>>(
			`${this.BASE_URL}/admin`
		)
		return response
	}

	async getAllActive() {
		const response = await axiosWithAuth.get<ICustomResponse<IUser[]>>(
			`${this.BASE_URL}`
		)
		return response
	}

	async getById(userId: string) {
		const response = await axiosWithAuth.get<ICustomResponse<IUser>>(
			`${this.BASE_URL}/admin/${userId}`
		)
		return response
	}

	async getActiveById(userId: string) {
		const response = await axiosWithAuth.get<ICustomResponse<IUser>>(
			`${this.BASE_URL}/${userId}`
		)
		return response
	}

	async getByEmail(email: string) {
		const response = await axiosWithAuth.get<ICustomResponse<IUser>>(
			`${this.BASE_URL}/email/${email}`
		)
		return response
	}

	async getByUsername(username: string) {
		const response = await axiosWithAuth.get<ICustomResponse<IUser>>(
			`${this.BASE_URL}/username/${username}`
		)
		return response
	}

	async getForSelect() {
		const response = await axiosWithAuth.get<
			ICustomResponse<IOption<string>[]>
		>(`${this.BASE_URL}/for-select`)
		return response
	}

	async create(req: ICreateUserRequest) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}`, req)
		return response
	}

	async update(req: IUpdateUserRequest) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}`, req)
		return response
	}

	async toggle(userId: string) {
		const response = await axiosWithAuth.patch(`${this.BASE_URL}/${userId}`)
		return response
	}

	async delete(userId: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${userId}`)
		return response
	}
}

export const userService = new UserService()
