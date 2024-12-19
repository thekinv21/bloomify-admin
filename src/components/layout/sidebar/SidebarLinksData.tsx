import {
	LayoutDashboardIcon,
	ShieldCheckIcon,
	UserRoundCheckIcon,
	UserRoundCogIcon
} from 'lucide-react'

import { pathConstant } from '@/constant'

import { RoleEnum } from '@/types/custom.enum'

export interface ISidebarLink {
	heading?: string
	label: string
	url: string
	icon: JSX.Element
	subLinks?: ISidebarSubLink[]
	hasAuthority?: string[]
}

export interface ISidebarSubLink {
	label: string
	url: string
	icon: JSX.Element
	hasAuthority?: string[]
}

export const sidebarLinks: ISidebarLink[] = [
	{
		label: 'dashboard',
		url: pathConstant.home,
		icon: <LayoutDashboardIcon size={18} strokeWidth={2} />,
		hasAuthority: [RoleEnum.USER]
	},
	{
		label: 'admin',
		heading: 'admin',
		url: '/admin/:name',
		icon: <ShieldCheckIcon size={18} strokeWidth={2} />,
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
