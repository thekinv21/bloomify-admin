import { ReactNode, Suspense } from 'react'

import { ReactQueryProvider } from './ReactQueryProvider'

interface IBaseProvider {
	children: ReactNode
}

export function BaseProvider({ children }: IBaseProvider) {
	return (
		<ReactQueryProvider>
			<Suspense fallback={<div>Loading....</div>}>{children}</Suspense>
		</ReactQueryProvider>
	)
}
