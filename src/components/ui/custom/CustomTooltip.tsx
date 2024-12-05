import { ReactNode } from 'react'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'

interface ICustomTooltip {
	children: ReactNode
	message: string
	position?: 'top' | 'right' | 'bottom' | 'left'
	isLink?: boolean
	url?: string
	offset?: number
	align?: 'start' | 'center' | 'end'
}

export function CustomTooltip({ children, ...props }: ICustomTooltip) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					side={props.position}
					sideOffset={props.offset}
					align={props.align}
				>
					{props.isLink ? (
						<a href={props.url?.toString()} className='cursor-pointer'>
							{props.message}
						</a>
					) : (
						<span className='cursor-text'>{props.message}</span>
					)}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
