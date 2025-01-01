import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'

import { API_URL } from '@/constant'

import { AlertCustomEnum, AlertEnum, TokenEnum } from '@/types/custom.enum'

import { AlertNotification } from '@/components/ui'

import { useUserStore } from '@/store/userStore'

import { authService } from '../auth.service'

import { errorCatch } from './error'

const options = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': 'https://admin.bloomify.life',
		'Access-Control-Allow-Methods': '*',
		'Access-Control-Allow-Headers': '*'
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
				try {
					const cookie = Cookies?.get(TokenEnum.USER)
					const cookieObject = cookie ? JSON.parse(cookie) : null
					const refreshToken = cookieObject
						? JSON.parse(cookieObject?.value)?.state?.refreshToken
						: null

					if (refreshToken) {
						const response = await authService.refreshToken(refreshToken)
						retryCount++

						if (response && response.status >= 200 && response.status < 300) {
							const expireMinute = 2
							const newExpiryDate = new Date(
								new Date().getTime() + expireMinute * 60 * 1000
							)

							Cookies.set(
								TokenEnum.USER,
								JSON.stringify({
									value: JSON.stringify({
										user: response?.data?.user,
										accessToken: response?.data?.accessToken,
										refreshToken: response?.data?.refreshToken,
										tokenSign: response?.data?.tokenSign
									}),
									expires: newExpiryDate
								}),
								{ expires: newExpiryDate }
							)

							await useUserStore.setState({
								user: response?.data?.user,
								accessToken: response?.data?.accessToken,
								refreshToken: response?.data?.refreshToken,
								tokenSign: response?.data?.tokenSign
							})

							retryCount = 0
							return axiosWithAuth(config)
						}
					}
				} catch (error) {
					AlertNotification({
						icon: AlertEnum.WARNING,
						message: errorCatch(error as AxiosError),
						customClass: AlertCustomEnum.WARNING
					})
				}
			} else {
				await useUserStore.setState({
					user: null,
					accessToken: null,
					refreshToken: null,
					tokenSign: null
				})

				await Cookies.remove(TokenEnum.USER)

				const currentPath = window.location.pathname
				window.location.href = `/auth/login?redirectUrl=${encodeURIComponent(currentPath)}`
			}
		}
		return Promise.reject(error)
	}
)

export { axiosClassic, axiosWithAuth }
