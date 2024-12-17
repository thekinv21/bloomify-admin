import clsx from 'clsx'
import { ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect } from 'react'

import { useResponsive } from '@/hooks'

import { SidebarStatus } from '@/types/custom.enum'

import { Button } from '@/components/ui'

import { useAppStore } from '@/store/appStore'

import styles from './Sidebar.module.scss'
import { SidebarLinks } from './SidebarLinks'
import { SidebarLogo } from './SidebarLogo'

export function Sidebar() {
	const { sidebar, toggleSidebar } = useAppStore()

	const { isDesktop } = useResponsive()

	useEffect(() => {
		if (isDesktop) {
			toggleSidebar(SidebarStatus.MOBILE)
		} else {
			toggleSidebar(SidebarStatus.NORMAL)
		}
	}, [isDesktop])

	function setSidebarWidth() {
		switch (sidebar) {
			case SidebarStatus.COLLAPSED:
				return 100
			case SidebarStatus.MOBILE:
				return 0
			default:
				return 270
		}
	}

	function setSidebarClassName() {
		switch (sidebar) {
			case SidebarStatus.COLLAPSED:
				return styles.collapsed_sidebar
			case SidebarStatus.MOBILE:
				return styles.mobile_sidebar
			default:
				return styles.sidebar
		}
	}

	function setChangeSidebar() {
		if (sidebar === SidebarStatus.MOBILE) {
			toggleSidebar(SidebarStatus.NORMAL)
			return
		}

		if (isDesktop && sidebar === SidebarStatus.NORMAL) {
			toggleSidebar(SidebarStatus.MOBILE)
			return
		}

		toggleSidebar(
			sidebar === SidebarStatus.NORMAL
				? SidebarStatus.COLLAPSED
				: SidebarStatus.NORMAL
		)
	}

	return (
		<motion.aside
			id='sidebar'
			className={setSidebarClassName()}
			animate={{
				width: setSidebarWidth()
			}}
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
				type='button'
				className={clsx(
					styles.toggle_btn,
					sidebar === SidebarStatus.MOBILE ? 'hidden' : 'flex'
				)}
				size='icon'
				variant='outline'
				onClick={setChangeSidebar}
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
