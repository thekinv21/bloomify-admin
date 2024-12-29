'use client'

import clsx from 'clsx'
import { Check, ChevronDown, Loader2Icon } from 'lucide-react'
import { useId, useState } from 'react'
import {
	Control,
	Controller,
	FieldError,
	FieldValues,
	Merge
} from 'react-hook-form'

import { useTranslate } from '@/hooks'

import { IOption } from '@/types/custom.types'

import {
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Label,
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui'

interface IMultiSelect {
	control: Control<FieldValues>
	name: string
	options: IOption<unknown>[]
	label?: string
	placeholder?: string
	required?: boolean
	error?:
		| FieldError
		| Merge<
				FieldError,
				[(FieldError | undefined)?, ...(FieldError | undefined)[]]
		  >
		| undefined
	isLoading?: boolean
	isDisabled?: boolean
}

export function CustomMultiSelect(props: IMultiSelect) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const uuid = useId()

	const { t } = useTranslate()

	return (
		<div className='space-y-2'>
			<Controller
				control={props.control}
				name={props.name}
				rules={{ required: props.required }}
				render={({ field }) => {
					const value = field.value || []
					const handleSelect = (cur: string) => {
						const newValue = value.includes(cur)
							? value.filter((item: string) => item !== cur)
							: [...value, cur]
						field.onChange(newValue)
					}

					return (
						<div className='space-y-2'>
							{props.label && (
								<Label
									className={clsx(
										`font-normal`,
										props.error ? 'text-destructive' : ''
									)}
									htmlFor={`select_option_multi_${uuid}`}
								>
									{props.label}
								</Label>
							)}
							<Popover open={isOpen} onOpenChange={setIsOpen}>
								<PopoverTrigger asChild>
									<Button
										id={`select_option_multi_${uuid}`}
										variant='outline'
										role='combobox'
										disabled={props.isDisabled}
										aria-expanded={isOpen}
										className={clsx(
											`h-10 w-full justify-between bg-background px-3 font-normal outline-offset-0 transition-all duration-300 ease-in-out hover:border-primary/70 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20`,
											props.error ? 'border border-destructive' : ''
										)}
									>
										<span
											className={clsx(
												'truncate',
												props.error
													? 'text-destructive'
													: 'text-muted-foreground'
											)}
										>
											{value?.length
												? value
														.map(
															(val: IOption<unknown>) =>
																props.options.find(
																	opt => String(opt.value) === String(val)
																)?.label
														)
														.join(', ')
												: props.placeholder
													? props.placeholder
													: t('select_option')}
										</span>
										<ChevronDown
											size={16}
											strokeWidth={2}
											className={clsx('shrink-0 text-muted-foreground/80')}
											aria-hidden='true'
											color={props.error ? 'red' : 'gray'}
										/>
									</Button>
								</PopoverTrigger>
								<PopoverContent
									className='w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0'
									align='start'
								>
									<Command>
										<CommandInput placeholder={t('search')} />
										<CommandList>
											<CommandEmpty>{t('options_is_not_found')}</CommandEmpty>
											<CommandGroup>
												{!props.isLoading ? (
													Array.isArray(props.options) &&
													props.options.length &&
													props.options.map(
														(opt: IOption<unknown>, idx: number) => (
															<CommandItem
																key={idx}
																value={String(opt.value)}
																onSelect={handleSelect}
															>
																{opt.label}
																{value.includes(String(opt.value)) && (
																	<Check
																		size={16}
																		strokeWidth={2}
																		className='ml-auto'
																	/>
																)}
															</CommandItem>
														)
													)
												) : (
													<div className='flex items-center justify-center py-4'>
														<Loader2Icon
															className='animate-spin'
															size={24}
															strokeWidth={2}
														/>
													</div>
												)}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
						</div>
					)
				}}
			/>

			{props.error ? (
				<p
					className='mt-2 text-xs text-destructive'
					role='alert'
					aria-live='polite'
				>
					{t('select_option')}
				</p>
			) : null}
		</div>
	)
}
