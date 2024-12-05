import { NavLink } from 'react-router'

import { CustomTooltip } from '@/components/ui'

import styles from './Sidebar.module.scss'
import { ISidebarLink } from './SidebarLinksData'

interface ISidebarCollapsedItem {
	item: ISidebarLink
}

export function SidebarCollapsedItem({ item }: ISidebarCollapsedItem) {
	return (
		<CustomTooltip message={item.label} position='right' isLink url={item.url}>
			<div>
				<NavLink
					to={item.url}
					className={({ isActive }) =>
						[
							styles.collapsed_link_button,
							isActive ? 'bg-slate-100/60 text-center text-primary' : ''
						].join(' ')
					}
				>
					<div className={styles.collapsed_link_icon}>{item.icon}</div>
				</NavLink>
			</div>
		</CustomTooltip>
	)
}

// interface ISidebarCollapsedDropdown {
// 	icon: JSX.Element
// 	subLinks: ISidebarSubLink[]
// }

// export function SidebarCollapsedDropdown({
// 	icon,
// 	subLinks
// }: ISidebarCollapsedDropdown) {
// 	return <div>SidebarCollapsedDropdown</div>
// }
