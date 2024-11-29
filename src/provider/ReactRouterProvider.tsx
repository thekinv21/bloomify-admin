import { BrowserRouter, Route, Routes } from 'react-router'

import { IRoute } from '@/types/routes.types'

import { useRouters } from '@/routes/useRouters'

export default function ReactRouterProvider() {
	const { routes } = useRouters()

	return (
		<BrowserRouter>
			<Routes>
				{routes.map((route: IRoute) => (
					<Route key={route.path} path={route.path} element={route.element} />
				))}
			</Routes>
		</BrowserRouter>
	)
}
