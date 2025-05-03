import { LoaderCircleIcon } from 'lucide-react'

import { cn } from '@/utils/utils'

export function Loader() {
	return (
		<div className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center backdrop-blur-md'>
			<LoaderCircleIcon
				className='animate-custom-spin text-primary transition-colors ease-linear'
				size={150}
				strokeWidth={1}
			/>
		</div>
	)
}

type TypeSmallLoader = {
	className?: string
}

export function SmallLoader({ className }: TypeSmallLoader) {
	return (
		<div className='flex h-full w-full items-center justify-center'>
			<LoaderCircleIcon
				className={cn(
					`animate-custom-spin text-secondary-primary transition-colors ease-linear`,
					className
				)}
				strokeWidth={1}
			/>
		</div>
	)
}
