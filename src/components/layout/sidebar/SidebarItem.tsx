import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import AnimateHeight from 'react-animate-height'
import { NavLink, useLocation } from 'react-router'

import { useCookie, useTranslate } from '@/hooks'

import { RoleEnum } from '@/types/custom.enum'

import styles from './Sidebar.module.scss'
import { ISidebarLink, ISidebarSubLink } from './SidebarLinksData'

interface ISidebarItem {
	item: ISidebarLink
}

export function SidebarItem({ item }: ISidebarItem) {
	const { t } = useTranslate()

	return (
		<NavLink
			to={item.url}
			className={({ isActive }) =>
				[
					styles.link_button,
					isActive ? 'bg-gray-100/20 text-primary' : ''
				].join(' ')
			}
		>
			<div className={styles.link_icon}>{item.icon}</div>
			<span className={styles.link_label}>{t(`${item.label}`)}</span>
		</NavLink>
	)
}

interface ISidebarItemDropdown {
	icon: JSX.Element
	label: string
	subLinks: ISidebarSubLink[]
	hasAuthority?: string[]
}

export function SidebarItemDropdown(dropdownLink: ISidebarItemDropdown) {
	const { t } = useTranslate()
	const location = useLocation()

	const { USER_ROLES } = useCookie()

	const [isOpen, setIsOpen] = useState<boolean>(false)

	const toggleDropdown = () => setIsOpen(!isOpen)

	const isAlwaysVisible =
		USER_ROLES?.includes(RoleEnum.ADMIN) ||
		USER_ROLES?.includes(RoleEnum.SUPER_ADMIN)

	const hasActiveLink = dropdownLink?.subLinks.some(
		link => location.pathname === link.url
	)

	const hasAuthorityForViewSubMenu = dropdownLink.hasAuthority?.some(
		(role: string) => USER_ROLES?.includes(role)
	)

	return (
		<>
			<button
				className={styles.link_button}
				onClick={toggleDropdown}
				aria-expanded={hasActiveLink}
			>
				<span className={styles.link_icon}>{dropdownLink.icon}</span>
				<div className={styles.dropdown_label}>
					<span>{t(dropdownLink.label)}</span>
					<p>
						{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
					</p>
				</div>
			</button>
			<AnimateHeight duration={500} height={isOpen ? 'auto' : 0}>
				<ul className={styles.dropdown_list}>
					{dropdownLink.subLinks.map((item: ISidebarSubLink, idx: number) => (
						<aside key={idx}>
							{isAlwaysVisible || hasAuthorityForViewSubMenu ? (
								<NavLink
									to={item.url}
									key={idx}
									className={({ isActive }) =>
										[styles.dropdown_item, isActive ? 'text-primary' : ''].join(
											' '
										)
									}
								>
									<li>
										<span>{item.icon}</span>
										<p>{t(`${item.label}`)}</p>
									</li>
								</NavLink>
							) : null}
						</aside>
					))}
				</ul>
			</AnimateHeight>
		</>
	)
}
