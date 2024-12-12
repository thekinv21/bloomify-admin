'use client'

import { useTranslate } from '@/hooks'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui'

import { useAppStore } from '@/store/appStore'

import i18n from '@/i18n'

type TypeLocalization = {
	locale: string
	flag: string
}

export function Localization() {
	const { t } = useTranslate()

	const { language, toggleLanguage } = useAppStore()

	const localizations: TypeLocalization[] = [
		{
			locale: 'russian',
			flag: '/assets/flags/RU.svg'
		},
		{
			locale: 'turkish',
			flag: '/assets/flags/TR.svg'
		},
		{
			locale: 'english',
			flag: '/assets/flags/EN.svg'
		}
	]

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						aria-label='Change Localization'
						className='flex h-10 w-10 items-center justify-center rounded-full border outline-none focus:outline-none'
					>
						<img
							src={
								localizations.find(
									localization => localization.locale === language
								)?.flag
							}
							alt={language}
							className='h-5 w-5 rounded-full object-cover'
							draggable={false}
						/>
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='mt-12 w-auto md:min-w-48' side='left'>
					{localizations.map((localization: TypeLocalization, idx: number) => (
						<DropdownMenuItem
							key={idx}
							onClick={() => {
								toggleLanguage(localization.locale)
								i18n.changeLanguage(localization.locale?.slice(0, 2))
							}}
						>
							<img
								src={localization.flag}
								alt={localization.locale}
								className='mr-2 h-5 w-5 rounded-full object-cover'
							/>
							<span>{t(`${localization.locale}`)}</span>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
