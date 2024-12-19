import { useCookie, useTranslate } from '@/hooks'

import { RoleEnum, SidebarStatus } from '@/types/custom.enum'

import { useAppStore } from '@/store/appStore'

import styles from './Sidebar.module.scss'
import { SidebarCollapsedDropdownItem } from './SidebarCollapsedDropdownItem'
import { SidebarCollapsedItem } from './SidebarCollapsedItem'
import { SidebarItem, SidebarItemDropdown } from './SidebarItem'
import { ISidebarLink, sidebarLinks } from './SidebarLinksData'

export function SidebarLinks() {
	const { sidebar } = useAppStore()
	const { t } = useTranslate()

	const { USER_ROLES } = useCookie()

	const isAlwaysVisible =
		USER_ROLES?.includes(RoleEnum.ADMIN) ||
		USER_ROLES?.includes(RoleEnum.SUPER_ADMIN)

	return (
		<nav
			className={
				sidebar !== SidebarStatus.COLLAPSED
					? styles.links
					: styles.links_collapsed
			}
		>
			{sidebar !== SidebarStatus.COLLAPSED ? (
				<aside>
					{sidebarLinks.map((item: ISidebarLink, idx: number) => (
						<div key={idx}>
							{(isAlwaysVisible ||
								item.hasAuthority?.some((role: string) =>
									USER_ROLES.includes(role)
								)) && (
								<div>
									{item.heading && (
										<p className={styles.heading}>{t(`${item.heading}`)}</p>
									)}

									<div>
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
									</div>
								</div>
							)}
						</div>
					))}
				</aside>
			) : (
				<aside>
					{sidebarLinks.map((item: ISidebarLink, idx: number) => (
						<div key={idx}>
							{(isAlwaysVisible ||
								item.hasAuthority?.some((role: string) =>
									USER_ROLES.includes(role)
								)) && (
								<div>
									{item.subLinks?.length ? (
										<SidebarCollapsedDropdownItem key={idx} item={item} />
									) : (
										<SidebarCollapsedItem key={idx} item={item} />
									)}
								</div>
							)}
						</div>
					))}
				</aside>
			)}
		</nav>
	)
}
