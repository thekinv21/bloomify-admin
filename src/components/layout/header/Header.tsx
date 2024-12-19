import { MenuIcon } from 'lucide-react'

import { SidebarStatus } from '@/types/custom.enum'

import { Button } from '@/components/ui'

import { useAppStore } from '@/store/appStore'

import styles from './Header.module.scss'
import { Localization } from './localization/Localization'
import { UserActions } from './user-actions/UserActions'

export function Header() {
	const { toggleSidebar, sidebar } = useAppStore()

	const handleToggleSidebar = () => {
		toggleSidebar(
			sidebar === SidebarStatus.MOBILE
				? SidebarStatus.NORMAL
				: SidebarStatus.MOBILE
		)
	}

	return (
		<header className={styles.header}>
			<div className={styles.left_side}>
				<Button
					type='button'
					size='icon'
					variant='outline'
					className={styles.hamburger}
					onClick={handleToggleSidebar}
				>
					<MenuIcon strokeWidth={1} size={18} />
				</Button>
			</div>

			<div className={styles.right_side}>
				<Localization />
				<UserActions />
			</div>
		</header>
	)
}
