import clsx from 'clsx'
import { useState } from 'react'
import { useLocation } from 'react-router'

import { useTranslate } from '@/hooks'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui'

import styles from './Sidebar.module.scss'
import { ISidebarLink } from './SidebarLinksData'
import { cn } from '@/utils/utils'

interface ISidebarCollapsedItem {
	item: ISidebarLink
}

export function SidebarCollapsedItem({ item }: ISidebarCollapsedItem) {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const location = useLocation()

	const hasActiveLink = item.url === location.pathname

	const { t } = useTranslate()

	return (
		<a
			href={item.url}
			rel='noopener noreferrer'
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
					<DropdownMenuItem
						onClick={() => {
							window.location.href = item.url
						}}
						className={clsx(styles.collapsed_sidebar_item)}
					>
						<>{item.icon}</>
						<span>{t(`${item.label}`)}</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</a>
	)
}
