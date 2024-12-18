import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import AnimateHeight from 'react-animate-height'
import { NavLink, useLocation } from 'react-router'

import { useTranslate } from '@/hooks'

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
}

export function SidebarItemDropdown({
	icon,
	label,
	subLinks
}: ISidebarItemDropdown) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { t } = useTranslate()
	const location = useLocation()

	const hasActiveLink = subLinks.some(link => location.pathname === link.url)

	const toggleDropdown = () => setIsOpen(!isOpen)

	return (
		<>
			<button
				className={styles.link_button}
				onClick={toggleDropdown}
				aria-expanded={hasActiveLink}
			>
				<span className={styles.link_icon}>{icon}</span>
				<div className={styles.dropdown_label}>
					<span>{t(label)}</span>
					<p>
						{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
					</p>
				</div>
			</button>
			<AnimateHeight duration={500} height={isOpen ? 'auto' : 0}>
				<ul className={styles.dropdown_list}>
					{subLinks.map((item: ISidebarSubLink, idx: number) => (
						<NavLink
							to={item.url}
							key={idx}
							className={({ isActive }) =>
								[styles.dropdown_item, isActive ? 'text-primary' : ''].join(' ')
							}
						>
							<li>
								<span>{item.icon}</span>
								<p>{t(`${item.label}`)}</p>
							</li>
						</NavLink>
					))}
				</ul>
			</AnimateHeight>
		</>
	)
}
