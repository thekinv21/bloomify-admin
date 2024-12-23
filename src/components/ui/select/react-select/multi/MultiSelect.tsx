import { Controller } from 'react-hook-form'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import '../../Select.scss'
import { ISelectProps } from '../../Select.types'

import { cn } from '@/utils/utils'

export function MultiSelect(props: ISelectProps) {
	const animatedComponent = makeAnimated()

	//NOTE: this variant takes only values from multiSelect array

	/* 
	
	value={props.options?.filter(option =>
		Array.isArray(value) ? value.includes(option.value) : null
	)}
	onChange={(newValue: MultiValue<any>) => {
		onChange(newValue?.map((item: ISelectOption) => item?.value))
	}}

	*/

	return (
		<div className='space-y-2'>
			{props.label && (
				<label className='text-sm font-normal'>{props.label}</label>
			)}
			<Controller
				control={props.control}
				name={props.name}
				rules={{ required: props.required }}
				render={({
					field: { onChange, onBlur, value, ref },
					fieldState: { error }
				}) => {
					return (
						<div>
							<div>
								<Select
									closeMenuOnSelect={false}
									ref={ref}
									name={props.name}
									placeholder={props.placeholder ?? 'Seçiniz'}
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									components={animatedComponent}
									classNamePrefix={'custom_select'}
									className={cn(
										props.className,
										error &&
											'rounded-lg border border-red-500 hover:border-none focus:border-none'
									)}
									options={props.options}
									isMulti
									isDisabled={props.isDisabled}
									isLoading={props.isLoading}
									isClearable
								/>
							</div>

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
		</div>
	)
}
