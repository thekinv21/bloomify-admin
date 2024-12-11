import { MenuIcon } from 'lucide-react'

import { SidebarStatus } from '@/types/custom.enum'

import { Button } from '@/components/ui'

import { useAppStore } from '@/store/appStore'

import styles from './Header.module.scss'
import { Localization } from './localization/Localization'
import { Mode } from './mode/Mode'
import { UserActions } from './user-actions/UserActions'

export function Header() {
	const { sidebar, toggleSidebar } = useAppStore()

	return (
		<header className={styles.header}>
			<div className={styles.left_side}>
				<Button
					size='icon'
					variant='outline'
					className={styles.hamburger}
					onClick={() =>
						toggleSidebar(
							sidebar === SidebarStatus.COLLAPSED
								? SidebarStatus.NORMAL
								: SidebarStatus.COLLAPSED
						)
					}
				>
					<MenuIcon strokeWidth={1} size={18} />
				</Button>
			</div>

			<div className={styles.right_side}>
				<Mode />
				<Localization />
				<UserActions />
			</div>
		</header>
	)
}
