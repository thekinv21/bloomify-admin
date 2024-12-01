import { ReactQueryProvider } from './ReactQueryProvider'
import ReactRouterProvider from './ReactRouterProvider'
import '@/i18n'

export function BaseProvider() {
	return (
		<ReactQueryProvider>
			<ReactRouterProvider />
		</ReactQueryProvider>
	)
}
