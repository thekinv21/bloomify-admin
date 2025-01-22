import { pathConstant } from '@/constant'

import { IRoute } from '@/types'
import { RoleEnum } from '@/types/custom.enum'

import {
	FlowersPage,
	HomePage,
	LoginPage,
	NotFoundPage,
	RolesPage,
	UserPage
} from '@/screens'

export const useRouters = () => {
	const routes: IRoute[] = [
		{
			path: '*',
			element: <NotFoundPage />,
			layout: 'blank'
		},
		{
			path: pathConstant.initial,
			element: <LoginPage />,
			layout: 'blank'
		},
		{
			path: pathConstant.login,
			element: <LoginPage />,
			layout: 'blank'
		},

		{
			path: pathConstant.home,
			element: <HomePage />,
			layout: 'default'
		},
		{
			path: pathConstant.user,
			element: <UserPage />,
			layout: 'default',
			hasAuthority: [RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN]
		},
		{
			path: pathConstant.role,
			element: <RolesPage />,
			layout: 'default',
			hasAuthority: [RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN]
		},
		{
			path: pathConstant.flowers,
			element: <FlowersPage />,
			layout: 'default',
			hasAuthority: [RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN]
		}
	]

	return { routes }
}
