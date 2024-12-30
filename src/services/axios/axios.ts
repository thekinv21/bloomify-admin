import axios from 'axios'
import Cookies from 'js-cookie'

import { API_URL } from '@/constant'

import { TokenEnum } from '@/types/custom.enum'

import { authService } from '../auth.service'

const options = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	}
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
	const cookie = Cookies?.get(TokenEnum.USER)
	const cookieObject = cookie ? JSON.parse(cookie) : null
	const accessToken = cookieObject
		? JSON.parse(cookieObject?.value)?.state?.accessToken
		: null

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

let retryCount = 0

axiosWithAuth.interceptors.response.use(
	response => response,
	async error => {
		const config = error.config
		if (error.response && error.response.status === 401 && !config._retry) {
			config._retry = true

			if (retryCount < 3) {
				retryCount++
				try {
					const cookie = Cookies?.get(TokenEnum.USER)
					const cookieObject = cookie ? JSON.parse(cookie) : null
					const refreshToken = cookieObject
						? JSON.parse(cookieObject?.value)?.state?.refreshToken
						: null

					const response = await authService.refreshToken(
						refreshToken as string
					)
					if (response && response.status === 200) {
						console.log('Token refreshed', response)

						retryCount = 0
						return axiosWithAuth(config)
					}
				} catch (err) {
					console.error('Error refreshing token:', err)
				}
			} else {
				await Cookies.remove(TokenEnum.USER)
				const currentPath = window.location.pathname
				window.location.href = `/auth/login?redirectUrl=${encodeURIComponent(currentPath)}`
			}
		}
		return Promise.reject(error)
	}
)

export { axiosClassic, axiosWithAuth }
