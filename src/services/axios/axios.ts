import axios from 'axios'
import Cookies from 'js-cookie'

import { TokenEnum } from '@/types/custom.enum'

export const API_URL = `${import.meta.env.VITE_BASE_URL}`

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

axiosWithAuth.interceptors.response.use(
	response => response,
	async error => {
		if (error?.response && error?.response?.status === 401) {
			await Cookies.remove(TokenEnum.USER)
			const currentPath = window.location.pathname
			window.location.href = `/auth/login?redirectUrl=${encodeURIComponent(currentPath)}`
		}
		return Promise.reject(error)
	}
)

export { axiosClassic, axiosWithAuth }
