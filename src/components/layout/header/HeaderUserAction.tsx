import {
	Bolt,
	BookOpen,
	Layers2,
	LogOut,
	LucideIcon,
	Pin,
	UserPen
} from 'lucide-react'

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

interface IMenu {
	icon: LucideIcon
	label: string
}

const menuOptions: IMenu[] = [
	{
		icon: Bolt,
		label: 'Option 1'
	},
	{
		icon: Layers2,
		label: 'Option 2'
	},
	{
		icon: BookOpen,
		label: 'Option 3'
	}
]

const secondaryMenuOptions: IMenu[] = [
	{
		icon: Pin,
		label: 'Option 4'
	},
	{
		icon: UserPen,
		label: 'Option 5'
	}
]

export default function HeaderUserAction() {
	const MenuItems = (items: IMenu[]) =>
		items.map(({ icon: Icon, label }, idx) => (
			<DropdownMenuItem key={idx}>
				<Icon
					size={16}
					strokeWidth={2}
					className='opacity-60'
					aria-hidden='true'
				/>
				<span>{label}</span>
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
						Admin Panel
					</span>
					<span className='truncate text-xs font-normal text-muted-foreground'>
						admin@gmail.com
					</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>{MenuItems(menuOptions)}</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>{MenuItems(secondaryMenuOptions)}</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='text-red-500 hover:text-red-600'>
					<LogOut
						size={16}
						strokeWidth={2}
						className='opacity-60'
						aria-hidden='true'
					/>
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
