import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router'

import { useRoute } from '@/hooks'

import { pathConstant } from '@/constant'

import { Loader } from '@/components/ui'

import { useUserStore } from '@/store/userStore'

interface IAuthProvider {
	children: React.ReactNode
}

export function AuthProvider({ children }: IAuthProvider) {
	const [isTransition, setIsTransition] = useState<boolean>(false)

	const { user, accessToken, saveUserToStore, removeUserFromStore } =
		useUserStore()

	const { route } = useRoute()
	const location = useLocation()

	const handleTransitionStart = useCallback(() => {
		setIsTransition(true)
	}, [])

	const handleTransitionEnd = useCallback(() => {
		setIsTransition(false)
	}, [])

	useEffect(() => {
		if (user && accessToken) {
			saveUserToStore({ user, accessToken })

			if (
				(location.pathname.includes(pathConstant.login) ||
					location.pathname.includes(pathConstant.register) ||
					location.pathname.includes(pathConstant.initial)) &&
				location.pathname !== pathConstant.home
			) {
				route(pathConstant.home, { replace: true })
			}
		} else {
			removeUserFromStore()
			if (location.pathname !== pathConstant.login) {
				route(pathConstant.login, { replace: true })
			}
		}
	}, [
		user,
		accessToken,
		location.pathname,
		route,
		saveUserToStore,
		removeUserFromStore
	])

	useEffect(() => {
		handleTransitionStart()

		const timeout = setTimeout(handleTransitionEnd, 2000)

		return () => clearTimeout(timeout)
	}, [location.pathname, handleTransitionStart, handleTransitionEnd])

	return <>{isTransition ? <Loader /> : children}</>
}
