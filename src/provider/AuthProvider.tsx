import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { pathConstant } from '@/constant'

import { useUserStore } from '@/store/userStore'

interface IAuthProvider {
	children: React.ReactNode
}

export function AuthProvider({ children }: IAuthProvider) {
	const { user, accessToken, saveUserToStore, removeUserFromStore } =
		useUserStore()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		if (user && accessToken) {
			saveUserToStore({ user, accessToken })

			if (
				location.pathname.includes(pathConstant.login) ||
				location.pathname.includes(pathConstant.register) ||
				location.pathname.includes(pathConstant.initial)
			) {
				navigate(pathConstant.home, { replace: true })
			}
		} else {
			removeUserFromStore()

			navigate(pathConstant.login, { replace: true })
		}
	}, [accessToken, user, location.pathname, navigate])

	return <>{children}</>
}
