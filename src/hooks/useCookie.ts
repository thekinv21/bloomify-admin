import Cookies from 'js-cookie'

import { TokenEnum } from '@/types/custom.enum'

export const useCookie = () => {
	const cookie = Cookies?.get(TokenEnum.USER)
	const cookieObject = cookie ? JSON.parse(cookie) : null

	const user = cookieObject
		? JSON.parse(cookieObject?.value)?.state?.user
		: null

	const accessToken = cookieObject
		? JSON.parse(cookieObject?.value)?.state?.accessToken
		: null

	return {
		user,
		accessToken
	}
}
