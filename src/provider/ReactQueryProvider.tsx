import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

interface IReactQueryProvider {
	children: React.ReactNode
}

export function ReactQueryProvider({ children }: IReactQueryProvider) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
