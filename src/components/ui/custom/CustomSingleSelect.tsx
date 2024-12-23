'use client'

import { Check, ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'

import { useTranslate } from '@/hooks'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '../command'
import { Option } from '../multiselect'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'

import { cn } from '@/utils/utils'

interface ICustomSingleSelectProps {
	label?: string
	placeholder?: string
	options: Option[]
}

export function CustomSingleSelect(props: ICustomSingleSelectProps) {
	const { t } = useTranslate()

	const Id = useId()

	const [open, setOpen] = useState<boolean>(false)
	const [value, setValue] = useState<string>('')

	return (
		<div className='space-y-2'>
			{props.label && (
				<Label className='font-normal' htmlFor={`select_${Id}`}>
					{props.label}
				</Label>
			)}
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						id={`select_${Id}`}
						variant='outline'
						role='combobox'
						aria-expanded={open}
						className='focus: w-full justify-between border-input bg-background px-3 py-[19px] font-normal outline-offset-0 transition-all duration-300 ease-in-out hover:border-primary hover:bg-background'
					>
						<span className={cn('truncate', !value && 'text-muted-foreground')}>
							{value
								? props.options.find((opt: Option) => opt.value === value)
										?.label
								: t(`${props.placeholder}`)}
						</span>
						<ChevronDown
							size={16}
							strokeWidth={2}
							className='shrink-0 text-muted-foreground/80'
							aria-hidden='true'
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className='w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0'
					align='start'
				>
					<Command>
						<CommandInput
							placeholder={
								props.placeholder ? t(`${props.placeholder}`) : t('search')
							}
						/>
						<CommandList>
							<CommandEmpty>{t('options_is_not_found')}</CommandEmpty>
							<CommandGroup>
								{Array.isArray(props.options) &&
									props.options.length &&
									props.options.map((opt: Option) => (
										<CommandItem
											key={opt.value}
											value={opt.value}
											onSelect={cur => {
												setValue(cur === value ? '' : cur)
												setOpen(false)
											}}
										>
											{opt.label}
											{value === opt.value && (
												<Check size={16} strokeWidth={2} className='ml-auto' />
											)}
										</CommandItem>
									))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}
