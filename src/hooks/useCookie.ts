import Cookies from 'js-cookie'

import { RoleEnum, TokenEnum } from '@/types/custom.enum'

export const useCookie = () => {
	const cookie = Cookies?.get(TokenEnum.USER)
	const cookieObject = cookie ? JSON.parse(cookie) : null

	const user = cookieObject
		? JSON.parse(cookieObject?.value)?.state?.user
		: null

	const accessToken = cookieObject
		? JSON.parse(cookieObject?.value)?.state?.accessToken
		: null

	const USER_ROLES = user?.roles

	const isAdmins =
		USER_ROLES?.includes(RoleEnum.ADMIN) ||
		USER_ROLES?.includes(RoleEnum.SUPER_ADMIN)

	return {
		user,
		accessToken,
		USER_ROLES,
		isAdmins
	}
}
