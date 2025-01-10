import {
	IGetMeResponse,
	ILoginRequest,
	ILoginResponse,
	IOtpRequest,
	IRegisterRequest
} from '@/types'

import { axiosClassic, axiosWithAuth } from './axios/axios'

class AuthService {
	private BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/auth`

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

	async logout() {
		const response = await axiosWithAuth.post<void>(`${this.BASE_URL}/logout`)
		return response
	}

	async refreshToken(refreshToken: string) {
		const response = await axiosClassic.post<ILoginResponse>(
			`${this.BASE_URL}/refresh-token`,
			{ refreshToken }
		)
		return response
	}

	async verifyOtp(data: IOtpRequest) {
		const response = await axiosClassic.post<ILoginResponse>(
			`${this.BASE_URL}/verify-otp`,
			data
		)
		return response
	}
}

export const authService = new AuthService()
