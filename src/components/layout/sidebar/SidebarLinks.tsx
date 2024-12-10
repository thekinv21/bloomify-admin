import { SidebarStatus } from '@/types/custom.enum'

import { useAppStore } from '@/store/appStore'

import styles from './Sidebar.module.scss'
import { SidebarCollapsedDropdownItem } from './SidebarCollapsedDropdownItem'
import { SidebarCollapsedItem } from './SidebarCollapsedItem'
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
			{sidebar !== SidebarStatus.COLLAPSED ? (
				<>
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
				</>
			) : (
				<>
					{sidebarLinks.map((item, idx) => (
						<aside key={idx}>
							{item.subLinks?.length ? (
								<SidebarCollapsedDropdownItem key={idx} item={item} />
							) : (
								<SidebarCollapsedItem key={idx} item={item} />
							)}
						</aside>
					))}
				</>
			)}
		</nav>
	)
}
