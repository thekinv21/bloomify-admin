import { pathConstant } from '@/constant'

import { IRoute } from '@/types'

import { HomePage, LoginPage } from '@/screens'

export const useRouters = () => {
	const routes: IRoute[] = [
		{
			path: pathConstant.initial,
			element: <LoginPage />
		},
		{
			path: pathConstant.login,
			element: <LoginPage />
		},

		{
			path: pathConstant.home,
			element: <HomePage />
		}
	]

	return { routes }
}
