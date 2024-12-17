import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router'

import { useCookie, useRoute } from '@/hooks'

import { pathConstant } from '@/constant'

import { Loader } from '@/components/ui'

import { useUserStore } from '@/store/userStore'

interface IAuthProvider {
	children: React.ReactNode
}

export function AuthProvider({ children }: IAuthProvider) {
	const [isTransition, setIsTransition] = useState<boolean>(false)

	const { saveUserToStore, removeUserFromStore } = useUserStore()

	const { accessToken, user } = useCookie()

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
			if (
				[
					pathConstant.login?.toString(),
					pathConstant.register?.toString(),
					pathConstant.initial?.toString()
				].includes(location.pathname)
			) {
				route(pathConstant.home, { replace: true })
			}
		} else {
			if (
				![
					pathConstant.login?.toString(),
					pathConstant.register?.toString(),
					pathConstant.initial?.toString()
				].includes(location.pathname)
			) {
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
