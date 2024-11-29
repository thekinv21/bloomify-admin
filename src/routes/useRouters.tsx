import { HomePage, LoginPage } from '@/screens'
import { IRoute } from '@/types'

export const useRouters = () => {
	const routes: IRoute[] = [
		{
			path: '/',
			element: <LoginPage />
		},
		{
			path: '/login',
			element: <LoginPage />
		},

		{
			path: '/home',
			element: <HomePage />
		}
	]

	return { routes }
}
