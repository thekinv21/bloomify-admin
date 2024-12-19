import {
	ICreateRoleRequest,
	ICustomResponse,
	IRole,
	IUpdateRoleRequest
} from '@/types'
import { IOption, IPaginationParams } from '@/types/custom.types'

import { API_URL, axiosWithAuth } from '../axios/axios'

class RoleService {
	private BASE_URL = `${API_URL}/api/role`

	async getAll(params: IPaginationParams) {
		const response = await axiosWithAuth.get<ICustomResponse<IRole[]>>(
			`${this.BASE_URL}/admin`,
			{
				params
			}
		)
		return response
	}

	async getAllActive() {
		const response = await axiosWithAuth.get<ICustomResponse<IRole[]>>(
			`${this.BASE_URL}`
		)
		return response
	}

	async getById(roleId: string) {
		const response = await axiosWithAuth.get<ICustomResponse<IRole>>(
			`${this.BASE_URL}/admin/${roleId}`
		)
		return response
	}

	async getActiveById(roleId: string) {
		const response = await axiosWithAuth.get<ICustomResponse<IRole>>(
			`${this.BASE_URL}/${roleId}`
		)
		return response
	}

	async getForSelect() {
		const response = await axiosWithAuth.get<
			ICustomResponse<IOption<number>[]>
		>(`${this.BASE_URL}/for-select`)
		return response
	}

	async create(req: ICreateRoleRequest) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}`, req)
		return response
	}

	async update(req: IUpdateRoleRequest) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}`, req)
		return response
	}

	async toggle(roleId: number) {
		const response = await axiosWithAuth.patch(`${this.BASE_URL}/${roleId}`)
		return response
	}

	async delete(roleId: number) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${roleId}`)
		return response
	}
}

export const roleService = new RoleService()
