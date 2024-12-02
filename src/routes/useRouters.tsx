import { pathConstant } from '@/constant'

import { IRoute } from '@/types'

import { HomePage, LoginPage } from '@/screens'

export const useRouters = () => {
	const routes: IRoute[] = [
		{
			path: '*',
			element: <div>Not found</div>,
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
			element: <div>User</div>,
			layout: 'default'
		},
		{
			path: pathConstant.role,
			element: <div>Role</div>,
			layout: 'default'
		}
	]

	return { routes }
}
