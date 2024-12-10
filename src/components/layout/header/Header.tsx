import { MenuIcon } from 'lucide-react'

import { SidebarStatus } from '@/types/custom.enum'

import { Button } from '@/components/ui'

import { useAppStore } from '@/store/appStore'

import styles from './Header.module.scss'
import HeaderLocalization from './HeaderLocalization'
import HeaderSystemAction from './HeaderSystemAction'
import HeaderUserAction from './HeaderUserAction'

export function Header() {
	const { sidebar, toggleSidebar } = useAppStore()

	return (
		<header className={styles.header}>
			<div className='flex items-center gap-x-5'>
				<Button
					size='icon'
					variant='outline'
					className='flex md:hidden'
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

			<div className='flex items-center justify-center gap-x-5'>
				<HeaderSystemAction />
				<HeaderLocalization />
				<HeaderUserAction />
			</div>
		</header>
	)
}
