import { SidebarStatus } from '@/types/custom.enum'

import { useAppStore } from '@/store/appStore'

import styles from './Sidebar.module.scss'
import { SidebarItem, SidebarItemDropdown } from './SidebarItem'
import { sidebarLinks } from './SidebarLinksData'

export function SidebarLinks() {
	const { sidebar } = useAppStore()

	return (
		<nav
			className={
				sidebar !== SidebarStatus.COLLAPSED
					? styles.links
					: styles.links_collapsed
			}
		>
			{sidebarLinks.map((item, idx) => (
				<aside key={idx}>
					{item.subLinks?.length ? (
						<SidebarItemDropdown
							key={idx}
							icon={item.icon}
							label={item.label}
							subLinks={item.subLinks}
						/>
					) : (
						<SidebarItem key={idx} item={item} />
					)}
				</aside>
			))}
		</nav>
	)
}
