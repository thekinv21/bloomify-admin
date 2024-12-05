import { ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react'

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
		<div
			className={
				sidebar === SidebarStatus.COLLAPSED
					? styles.collapsed_sidebar
					: styles.sidebar
			}
		>
			<SidebarLogo sidebar={sidebar} />
			<div className={styles.sidebar_content}>
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
		</div>
	)
}
