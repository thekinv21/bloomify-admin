import {
	LayoutDashboardIcon,
	ShieldCheckIcon,
	UserRoundCheckIcon,
	UserRoundCogIcon
} from 'lucide-react'

import { pathConstant } from '@/constant'

export interface ISidebarLink {
	label: string
	url: string
	icon: JSX.Element
	subLinks?: ISidebarSubLink[]
}

export interface ISidebarSubLink {
	label: string
	url: string
	icon: JSX.Element
}

export const sidebarLinks: ISidebarLink[] = [
	{
		label: 'dashboard',
		url: pathConstant.home,
		icon: <LayoutDashboardIcon size={21} strokeWidth={2} />
	},
	{
		label: 'admin',
		url: '/admin/:name',
		icon: <ShieldCheckIcon size={21} strokeWidth={2} />,
		subLinks: [
			{
				label: 'user',
				url: pathConstant.user,
				icon: <UserRoundCheckIcon size={16} strokeWidth={2} />
			},
			{
				label: 'role',
				url: pathConstant.role,
				icon: <UserRoundCogIcon size={16} strokeWidth={2} />
			}
		]
	}
]
