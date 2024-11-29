import LoaderProvider from './LoaderProvider'
import { ReactQueryProvider } from './ReactQueryProvider'
import ReactRouterProvider from './ReactRouterProvider'

export function BaseProvider() {
	return (
		<ReactQueryProvider>
			<LoaderProvider>
				<ReactRouterProvider />
			</LoaderProvider>
		</ReactQueryProvider>
	)
}
