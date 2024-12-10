'use client'

import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react'
import React, { useState } from 'react'

import { useTranslate } from '@/hooks'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui'

type TypeMode = {
	mode: string
	icon: LucideIcon
}

type TypeTheme = 'light' | 'dark' | 'system'

export default function HeaderSystemAction() {
	const [theme, setTheme] = useState<TypeTheme>('system')
	const { t } = useTranslate()

	const systemPreference = 'light'
	const displayTheme = theme === 'system' ? systemPreference : theme

	const modes: TypeMode[] = [
		{
			mode: 'light',
			icon: Sun
		},
		{
			mode: 'dark',
			icon: Moon
		},
		{
			mode: 'system',
			icon: Monitor
		}
	]

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						aria-label='Change Mode'
						className='flex h-10 w-10 items-center justify-center rounded-full border outline-none focus:outline-none'
					>
						{displayTheme === 'light' && (
							<Sun size={18} strokeWidth={2} aria-hidden='true' />
						)}
						{displayTheme === 'dark' && (
							<Moon size={18} strokeWidth={2} aria-hidden='true' />
						)}
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='mt-12 w-auto md:min-w-40' side='left'>
					{modes.map(({ mode, icon }) => (
						<DropdownMenuItem
							key={mode}
							onClick={() => setTheme(mode as TypeTheme)}
						>
							{React.createElement(icon, {
								size: 16,
								strokeWidth: 2,
								className: 'opacity-60',
								'aria-hidden': true
							})}
							<span>{t(`${mode}`)}</span>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
