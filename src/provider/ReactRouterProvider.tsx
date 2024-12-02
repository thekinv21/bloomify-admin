import { BrowserRouter, Route, Routes } from 'react-router'

import { IRoute } from '@/types/routes.types'

import { MainLayout } from '@/components/layout'

import { AuthProvider } from './AuthProvider'
import { useRouters } from '@/routes/useRouters'

export default function ReactRouterProvider() {
	const { routes } = useRouters()

	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					{routes.map((route: IRoute) => (
						<Route
							key={route.path}
							path={route.path}
							element={
								route.layout === 'default' ? (
									<MainLayout>{route.element}</MainLayout>
								) : (
									route.element
								)
							}
						/>
					))}
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}
