import * as React from 'react'

import { cn } from '@/utils/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base outline-none transition-all duration-500 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-primary/70 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
					className
				)}
				autoComplete='off'
				ref={ref}
				{...props}
			/>
		)
	}
)
Input.displayName = 'Input'

export { Input }
