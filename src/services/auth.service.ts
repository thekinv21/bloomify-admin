import {
	IGetMeResponse,
	ILoginRequest,
	ILoginResponse,
	ILogoutRequest,
	IRegisterRequest
} from '@/types'

import { API_URL, axiosClassic, axiosWithAuth } from './axios/axios'

class AuthService {
	private BASE_URL = `${API_URL}/api/auth`

	async login(request: ILoginRequest) {
		const response = await axiosClassic.post<ILoginResponse>(
			`${this.BASE_URL}/login`,
			request
		)
		return response
	}

	async register(request: IRegisterRequest) {
		const response = await axiosClassic.post<IRegisterRequest>(
			`${this.BASE_URL}/login`,
			request
		)
		return response
	}

	async getMe() {
		const response = await axiosWithAuth.get<IGetMeResponse>(
			`${this.BASE_URL}/get-myself`
		)
		return response
	}

	async logout(request: ILogoutRequest) {
		const response = await axiosWithAuth.post<IGetMeResponse>(
			`${this.BASE_URL}/logout`,
			request
		)
		return response
	}
}

export const authService = new AuthService()
