import { ReactQueryProvider } from './ReactQueryProvider'
import ReactRouterProvider from './ReactRouterProvider'

export function BaseProvider() {
	return (
		<ReactQueryProvider>
			<ReactRouterProvider />
		</ReactQueryProvider>
	)
}
