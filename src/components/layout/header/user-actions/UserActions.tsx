import { LogOut, LucideIcon, Settings, UserPen } from 'lucide-react'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui'

import { useUserActions } from './useUserActions'

interface IMenu {
	icon: LucideIcon
	label: string
}

const menuOptions: IMenu[] = [
	{
		icon: Settings,
		label: 'settings'
	}
]

const secondaryMenuOptions: IMenu[] = [
	{
		icon: UserPen,
		label: 'profile'
	}
]

export function UserActions() {
	const { handleLogout, t, user } = useUserActions()

	const MenuItems = (items: IMenu[]) =>
		items.map(({ icon: Icon, label }, idx) => (
			<DropdownMenuItem key={idx}>
				<Icon size={16} strokeWidth={2} className='opacity-60' />
				<span>{t(`${label}`)}</span>
			</DropdownMenuItem>
		))

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				asChild
				className='cursor-pointer border-none outline-none focus:outline-none'
			>
				<Avatar>
					<AvatarImage src='/avatar.png' alt='LoggedIn User Avatar' />
					<AvatarFallback>AD</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='mt-12 w-auto md:min-w-64' side='left'>
				<DropdownMenuLabel className='flex min-w-0 flex-col'>
					<span className='truncate text-sm font-medium text-foreground'>
						{user?.firstName + ' ' + user?.lastName}
					</span>
					<span className='truncate text-xs font-normal text-muted-foreground'>
						{user?.email}
					</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>{MenuItems(menuOptions)}</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>{MenuItems(secondaryMenuOptions)}</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='text-red-500 hover:text-red-600'
					onClick={handleLogout}
				>
					<LogOut size={16} strokeWidth={2} className='opacity-60' />
					<span>{t('logout')}</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
