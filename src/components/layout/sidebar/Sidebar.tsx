import { ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react'
import { motion } from 'motion/react'

import { SidebarStatus } from '@/types/custom.enum'

import { Button } from '@/components/ui'

import { useAppStore } from '@/store/appStore'

import styles from './Sidebar.module.scss'
import { SidebarLinks } from './SidebarLinks'
import { SidebarLogo } from './SidebarLogo'
import { cn } from '@/utils/utils'

export function Sidebar() {
	const { sidebar, toggleSidebar } = useAppStore()

	return (
		<motion.aside
			className={
				sidebar === SidebarStatus.COLLAPSED
					? styles.collapsed_sidebar
					: styles.sidebar
			}
			animate={{ width: sidebar === SidebarStatus.COLLAPSED ? 100 : 270 }}
			transition={{ type: 'spring', stiffness: 300, damping: 22 }}
		>
			<SidebarLogo sidebar={sidebar} />
			<div
				className={
					sidebar !== SidebarStatus.COLLAPSED
						? styles.sidebar_content
						: styles.collapsed_sidebar_content
				}
			>
				<SidebarLinks />
			</div>
			<Button
				className={cn(styles.toggle_btn)}
				size='icon'
				variant='outline'
				onClick={() =>
					toggleSidebar(
						sidebar === SidebarStatus.COLLAPSED
							? SidebarStatus.NORMAL
							: SidebarStatus.COLLAPSED
					)
				}
			>
				{sidebar === SidebarStatus.NORMAL ? (
					<ChevronsLeftIcon strokeWidth={1} size={18} />
				) : (
					<ChevronsRightIcon strokeWidth={1} size={18} />
				)}
			</Button>
		</motion.aside>
	)
}
