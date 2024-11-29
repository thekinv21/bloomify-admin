import { Suspense } from 'react'

interface ILoaderProvider {
	children: React.ReactNode
}

export default function LoaderProvider({ children }: ILoaderProvider) {
	return <Suspense fallback={<div>Loading....</div>}>{children}</Suspense>
}
