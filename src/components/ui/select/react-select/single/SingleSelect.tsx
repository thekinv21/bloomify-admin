import clsx from 'clsx'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import '../../Select.scss'
import { ISelectProps } from '../../Select.types'

import { cn } from '@/utils/utils'

export function SingleSelect(props: ISelectProps) {
	const animatedComponent = makeAnimated()

	return (
		<Controller
			control={props.control}
			name={props.name}
			rules={{ required: props.required ? true : false }}
			render={({
				field: { onChange, onBlur, value, ref },
				fieldState: { error }
			}) => {
				const option =
					props.options?.find(option => option.value === value) || null

				return (
					<div className='space-y-2'>
						{props.label && (
							<label className='text-sm font-normal'>{props.label}</label>
						)}

						<>
							<Select
								ref={ref}
								name={props.name}
								placeholder={props.placeholder ?? 'Seçiniz'}
								value={option ?? ''}
								onChange={(newValue: any) => {
									onChange(newValue ? newValue.value : null)
								}}
								onBlur={onBlur}
								components={animatedComponent}
								classNamePrefix={`custom_select`}
								className={clsx(
									props.className,
									error &&
										'rounded-lg border border-red-500 hover:border-none focus:border-none'
								)}
								options={props.options}
								isDisabled={props.isDisabled}
								isLoading={props.isLoading}
								isClearable
							/>
						</>

						<p
							className={cn(
								'mt-3 text-xs',
								error ? 'text-red-500' : 'text-transparent'
							)}
						>
							{error?.message ? error.message : 'This field is required'}
						</p>
					</div>
				)
			}}
		/>
	)
}
