import { Navigate } from 'react-router'

import { useCookie } from '@/hooks'

import { RoleEnum } from '@/types/custom.enum'

interface IAllowPageProvider {
	hasAuthority: string[]
	children: React.ReactNode
}

export function AllowPageProvider({
	children,
	hasAuthority
}: IAllowPageProvider) {
	const { USER_ROLES } = useCookie()

	const isAlwaysVisible =
		USER_ROLES?.includes(RoleEnum.ADMIN) ||
		USER_ROLES?.includes(RoleEnum.SUPER_ADMIN)

	const hasAllow =
		isAlwaysVisible ||
		USER_ROLES?.some((role: string) => hasAuthority.includes(role))

	if (!hasAllow) {
		return <Navigate to='/*' replace />
	}

	return children
}
