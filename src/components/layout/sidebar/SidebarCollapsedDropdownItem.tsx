import { useState } from 'react'
import { useLocation } from 'react-router'

import { useTranslate } from '@/hooks'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui'

import { ISidebarLink, ISidebarSubLink } from './SidebarLinksData'
import { cn } from '@/utils/utils'

interface ISidebarCollapsedDropdownItem {
	item: ISidebarLink
}

export function SidebarCollapsedDropdownItem({
	item
}: ISidebarCollapsedDropdownItem) {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const location = useLocation()

	const hasActiveLink = item.subLinks?.some(
		link => location.pathname === link.url
	)

	const { t } = useTranslate()

	return (
		<div
			className={cn(
				'mx-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg',
				hasActiveLink ? 'text-primary' : ''
			)}
		>
			<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
				<DropdownMenuTrigger
					onMouseEnter={() => setIsOpen(!isOpen)}
					onMouseDown={() => setIsOpen(!isOpen)}
					onMouseMove={() => setIsOpen(!isOpen)}
					className='border-none outline-none'
				>
					<>{item.icon}</>
				</DropdownMenuTrigger>

				<DropdownMenuContent side='right' sideOffset={50} className='w-56'>
					{item.subLinks?.map((subLink: ISidebarSubLink) => (
						<DropdownMenuItem
							onClick={() => {
								window.location.href = subLink.url
							}}
							key={subLink.url}
						>
							<>{subLink.icon}</>

							<span className='capitalize'>{t(`${subLink.label}`)}</span>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
